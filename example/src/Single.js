import React, { Component } from 'react';
import DnD from 'react-dnd-drop';

export default class App extends Component {

  state = {
    items: [],
  }

  dropArea;

  onDrop = (v) => {
    console.log('drop',v)
    this.setState({
      items: [
        ...this.state.items,
        v
      ]
    })
  }

  render(){

    const { items } = this.state;

    return <div>
      <p>Left box is the drop zone, right boxes are the draggable items</p>
      <div className="container">
        <div className="left">
          <div className="dropzone" ref={r => this.dropArea = r}>{items.map(v =>
            <div key={v} className="item">item {v}</div>
          )}</div>
        </div>
        <div className="right item-container">{[...Array(5).keys()].map(v => (
          <DnD 
            key={v} 
            getDropAreas={() => [this.dropArea]} 
            onDrop={() => this.onDrop(v)}
          ><div className="item">item {v}</div></DnD>
        ))}</div>
      </div>
    </div>

  }

}