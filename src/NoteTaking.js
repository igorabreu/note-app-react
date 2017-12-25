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
    selectedNotes: [],
    focusNote: 0,
  }

/*  componentDidMount() {
    var self = this;
    setInterval(function(){ console.log(self.state.selectedNotes); }, 1000);
  }*/

  render() {
    return (
      <div className="App">
        <input type='text' onChange={ this.onTitle } value={ this.state.noteTitle } onKeyUp={ this.onKeyUp}/>
        <button onClick={ this.addNote }>add</button>
        <button onClick={ this.removeSelected }>remove</button>
        { this.renderNotes() }
      </div>
    );
  }

  renderNotes = () => {
    return this.state.noteList.map((note, index) => {
      return(
        <li className={ `note ${this.isHighlight(index)}` } key={index} onClick={ () => this.setFocus(index) }>
          <input type='checkbox' defaultChecked={ this.isSelected(index) } onClick={ () => this.selectNote(index) } />
          <h3>{ note.title }</h3>
        </li>
      )
    })
  }

  isHighlight = (index) => {
    let className = '';
    if (index === this.state.focusNote) {
      className = 'highlight';
    }
    return className;
  }

  onKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.addNote();
    }
  }

  onTitle = (e) => {
    this.setState({ noteTitle: e.target.value });
  }

  setFocus = (index) => {
    this.setState({ focusNote: index });
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

  selectNote = (index) => {
    let newSelection;
    if (this.isSelected(index)){
      this.setState({ selectedNotes: this.state.selectedNotes.filter(item => item !== index) });
      return;
    }
    newSelection = this.state.selectedNotes.concat(index);
    this.sortArray(newSelection);
    this.setState({ selectedNotes: newSelection });
  }

  isSelected = (index) => {
    return this.state.selectedNotes.indexOf(index) > -1;
  }

  removeSelected = () => {
    let newList = this.state.noteList;
    for (var i = this.state.selectedNotes.length - 1; i >= 0; i--) {
      newList.splice(this.state.selectedNotes[i], 1);
    }
    this.setState({ noteList: newList, selectedNotes: [] });
    if (this.state.focusNote - 1 >= 0) {
      this.setFocus(this.state.focusNote - 1);
    }
  }

  sortArray = (array) => {
    return array.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }
}

export default NoteTaking;
