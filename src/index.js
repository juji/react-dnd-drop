import React, { Component } from 'react';
import boxIntersect  from 'box-intersect';
import ReactDOM from 'react-dom'

export default class DnD extends Component {

  constructor(props){

    super(props);
    this.state = {
      dragging: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      deltaTop:0,
      deltaLeft:0
    }

    this.copy = null;
    this.elm = null;

  }

  onMouseDown = (e) => {
    console.log('onMouseDown');
    try{ e.preventDefault() }catch(e){}
    const { top, left, width, height } = ReactDOM.findDOMNode(this.elm).getBoundingClientRect();
    this.setState({ top, left, width, height, 
      dragging: true,
      deltaLeft: (e.touches && typeof e.touches[0].clientX !== undefined ? e.touches[0].clientX : e.clientX) - left,
      deltaTop: (e.touches && typeof e.touches[0].clientY !== undefined ? e.touches[0].clientY : e.clientX) - top
    })
  }

  onMouseMove = (e) => {
    console.log('onMouseMove');
    if(!this.state.dragging) return;
    this.setState({
      left: (e.touches && typeof e.touches[0].clientX !== undefined ? e.touches[0].clientX : e.clientX) - this.state.deltaLeft,
      top: (e.touches && typeof e.touches[0].clientY !== undefined ? e.touches[0].clientY : e.clientX) - this.state.deltaTop
    })
  }

  onMouseUp = () => {
    if(!this.state.dragging) return;
    this.setState({ dragging: false });
    this._intersect();
  }

  _intersect = () => {

    // check for null dropArea
    const dropAreas = this.props.getDropAreas();

    const nullVal = dropAreas.filter(v => !v);
    if(nullVal.length) throw new Error('REACT-DND-DROP: dropArea Element cannot be empty');

    const bound = ReactDOM.findDOMNode(this.copy).getBoundingClientRect();
    const copy = [ bound.left, bound.top, bound.right, bound.bottom ];

    // calc intersect
    const overlaps = dropAreas.map((v,i) => {
      const b = ReactDOM.findDOMNode(v).getBoundingClientRect();
      return boxIntersect( [[ b.left, b.top, b.right, b.bottom ], copy] ).length ? i : null
    }).filter(v => v!== null);

    if(overlaps.length && overlaps)
      this.props.onDrop( overlaps )
  }

  render(){
    
    const { dragging, width, height, top, left } = this.state;
    const { overlayStyle, copyStyle } = this.props;

    const overlay = {
      backgroundColor:'transparent',
      position:'fixed',
      top:0,
      left:0,
      width:'100%',
      height:'100%',
      zIndex:'3000',
      cursor:'grabbing',
      ...(overlayStyle || {}),
      display: dragging ? 'block' : 'none'
    }

    const copy = {
      opacity:0.8,
      position:'fixed',
      zIndex:'3001',
      cursor:'grabbing',
      ...(copyStyle || {}),
      display: dragging ? 'inline-block' : 'none',
      width, height, top, left
    }

    return <div ref={r => this.elm = r} 
      onMouseDown={this.onMouseDown} 
      onTouchStart={this.onMouseDown}
      onTouchMove={ dragging ? this.onMouseMove : null }
      onTouchEnd={ dragging ? this.onMouseUp : null }
    >
      {this.props.children}
      <div 
        onMouseMove={ dragging ? this.onMouseMove : null }
        onMouseUp={ dragging ? this.onMouseUp : null }
        style={overlay}
      >
        <div ref={r => this.copy = r} style={copy}>
          {this.props.children}
        </div>
      </div>
    </div>

  }

}