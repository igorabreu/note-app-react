import React, { Component } from 'react'
import uuid from 'uuid/v4'
import IconAdd from './assets/add-icon.svg'
import IconRemove from './assets/trash-icon.svg'

import './styles/NoteTaking.css';

class NoteTaking extends Component {
  constructor(props){
    super(props)
    this.state = {
      noteList: [
        {
          uuid: uuid(),
          title: "Custumer's address",
          text: '',
        },
        {
          uuid: uuid(),
          title: '12/22 daily meeting',
          text: '',
        },
      ],
      noteTitle: '',
      selectedNotes: [],
      focusNote: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyboardArrows);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyboardArrows);
  }

  isHighlight = (index) => {
    let className = ''
    if (index === this.state.focusNote) {
      className = 'highlight'
    }
    return className
  }

  onKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.addNote()
    }
  }

  onTitle = (e) => {
    this.setState({ 
      noteTitle: e.target.value 
    })
  }

  setFocus = (index) => {
    this.setState({ 
      focusNote: index 
    })
  }

  onKeyboardArrows = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (this.state.focusNote >= 1) {
          this.setFocus(this.state.focusNote - 1);
        }
        break
      case 'ArrowDown':
        if (this.state.focusNote < this.state.noteList.length - 1) {
          this.setFocus(this.state.focusNote + 1);
        }
        break
      default:
        break
    }
  }

  addNote = () => {
    if( this.state.noteTitle === '' ){
      return
    }
    let newNote = {
      uuid: uuid(),
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
    if (this.isSelected(index)) {
      this.setState({ 
        selectedNotes: this.state.selectedNotes.filter(item => item !== index),
      });
      return
    }
    newSelection = this.state.selectedNotes.concat(index)
    this.sortArray(newSelection)
    this.setState({ 
      selectedNotes: newSelection 
    })
  }

  isSelected = (index) => {
    return this.state.selectedNotes.indexOf(index) > -1;
  }

  selectAll = () => {
    this.setState({ 
      selectedNotes: [] 
    });
    let allSelected = []
    for (var i = this.state.noteList.length - 1; i >= 0; i--) {
      allSelected.push(i)
    }
    this.sortArray(allSelected)
    this.setState({ 
      selectedNotes: allSelected,
    })
  }

  isAllSelected = () => {
    //console.log(this.state.selectedNotes.length === this.state.noteList.length)
    return this.state.selectedNotes.length === this.state.noteList.length
  }

  removeSelected = () => {
    if (this.state.selectedNotes.length === 0) {
      return
    }
    let newList = this.state.noteList;
    for (let i = this.state.selectedNotes.length - 1; i >= 0; i--) {
      newList.splice(this.state.selectedNotes[i], 1)
    }
    if (this.state.focusNote - 1 >= 0) {
      this.setFocus(this.state.focusNote - 1)
    }
    this.setState({ 
      noteList: newList, 
      selectedNotes: [],
    })
  }

  sortArray = (array) => {
    return array.sort((a, b) => {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    })
  }

  addDescription = (index, e) => {
    let newList = this.state.noteList
    newList[index].text = e.target.value
    this.setState({
      noteList: newList
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Note-taking App</h1>
        <input type='text' onChange={this.onTitle} value={this.state.noteTitle} onKeyUp={this.onKeyUp} />
        <img className='add-icon' src={IconAdd} onClick={this.addNote} />
        <div className='content-wrapper'>
          <div className='board'>
            <div className='actions'>
              <img src={IconRemove} onClick={this.removeSelected} />
              <input type='checkbox' checked={this.isAllSelected()} onClick={this.selectAll} />
              <label>all</label>
            </div>
            {this.renderNotes()}
            <div className='description' >{this.renderText()}</div>
          </div>
        </div>
      </div>
    )
  }

  renderNotes = () => {
    return this.state.noteList.map((note, index) => {
      return (
        <div className='notes' key={note.uuid}>
          <li className={`note ${this.isHighlight(index)}`} onClick={() => this.setFocus(index)}>
            <input type='checkbox' checked={this.isSelected(index)} onClick={() => this.selectNote(index)} />
            <span className='note-title'>{note.title}</span>
          </li>
        </div>
      )
    })
  }

  renderText = () => {
    return this.state.noteList.map((note, index) => {
      if (index === this.state.focusNote) {
        return (
          <textarea
            key={note.uuid}
            placeholder={'Write a drescription here'}
            value={note.text} 
            onChange={(e) => this.addDescription(index, e)}
          />
        )
      }
    })
  }
}

export default NoteTaking;
