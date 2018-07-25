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
      <h1>React-DnD-Drop Example</h1>
      <p>
        <button onClick={() => this.setState({ page: 'single' })}>Single</button>
        <button onClick={() => this.setState({ page: 'multiple' })}>Multiple</button>
      </p>
      {( page === 'single' && <Single /> ) || null}
      {( page === 'multiple' && <Multiple /> ) || null}
    </div>

  }

}