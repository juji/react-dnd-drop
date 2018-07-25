import React, { Component } from 'react';
import Single from './Single';
import Multiple from './Multiple';


export default class App extends Component {

  state = {
    page: 'single',
  }

  render(){

    const { page } = this.state;

    return <div id="app">
      <h1>React-DnD-Drop</h1>
      <p>
        Is a drag-n-drop component for React. 
        Enables you to place an item on a drop-area.
        It works with the DOM.
      </p>
      <p>
        <small>This is not a sort. It's a fancy multiple-selection thingy.</small><br />
        <a href="https://github.com/juji/react-dnd-drop">Docs</a>
      </p>
      <br /><br />
      <p>
        <button className={this.state.page === 'single' ? 'active' : ''} onClick={() => this.setState({ page: 'single' })}>Single</button>
        <button className={this.state.page === 'multiple' ? 'active' : ''} onClick={() => this.setState({ page: 'multiple' })}>Multiple</button>
      </p>
      {( page === 'single' && <Single /> ) || null}
      {( page === 'multiple' && <Multiple /> ) || null}
      <p><a href="http://jujiyangasli.com">jujiyangasli.com</a></p>
    </div>

  }

}