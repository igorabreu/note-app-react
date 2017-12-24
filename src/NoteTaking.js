import React, { Component } from 'react';
import './styles/NoteTaking.css';

class NoteTaking extends Component {

  state = {
    noteList: [
      {
        title: "Custumer's address",
        text: '',
      },
      {
        title: '12/22 daily meeting',
        text: '',
      },
    ],
    noteTitle: '',
    selectedNotes: [ 0 ],
  }

  render() {
    return (
      <div className="App">
        <input type='text' onChange={ this.onTitle } value={ this.state.noteTitle }/>
        <button onClick={ this.addNote }>add</button>
        { this.renderNotes() }
      </div>
    );
  }

  onTitle = (e) => {
    this.setState({ noteTitle: e.target.value });
  }

  addNote = () => {
    let newNote = {
      title: this.state.noteTitle,
      text: '',
    }
    this.setState({
      noteList: this.state.noteList.concat(newNote),
      noteTitle: '',
    }) 
  }

  renderNotes = () => {
    return this.state.noteList.map((note, index) => {
      return(
        <li key={index}>
          <input type='checkbox' defaultChecked={ this.isSelected(index) } />
          <h3>{ note.title }</h3>
        </li>
      )
    })
  }

  isSelected = (index) => {
    return this.state.selectedNotes.includes(index);
  }
}

export default NoteTaking;
