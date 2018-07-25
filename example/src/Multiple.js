import React, { Component } from 'react';
import DnD from 'react-dnd-drop';

export default class App extends Component {

  state = {
    items1: [],
    items2: [],
  }

  dropArea1;
  dropArea2;

  onDrop = (idx, v) => {
    this.setState({
      [`items${idx[0]+1}`]: [
        ...this.state[`items${idx[0]+1}`],
        v
      ]
    })
  }

  render(){

    const { items1, items2 } = this.state;

    return <div>
      <p>First two boxes are the drop zones, right boxes are the draggable items</p>
      <div className="container">
        <div className="left">

          <div className="container">
            
            <div className="left">
              <div className="dropzone" ref={r => this.dropArea1 = r}>{items1.map(v =>
                <div className="item">item {v}</div>
              )}</div>
            </div>

            <div className="right">
              <div className="dropzone" ref={r => this.dropArea2 = r}>{items2.map(v =>
                <div className="item">item {v}</div>
              )}</div>
            </div>

          </div>

        </div>
        <div className="right item-container">{[...Array(5).keys()].map(v => (
          <DnD 
            key={v} 
            getDropAreas={() => [this.dropArea1, this.dropArea2]} 
            onDrop={idx => this.onDrop(idx, v)}
          ><div className="item">item {v}</div></DnD>
        ))}</div>
      </div>
    </div>

  }

}