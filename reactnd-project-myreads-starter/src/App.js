import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Searchpage from './SearchPage'
import MyReads from './MyReads'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount() {
    this.getAll()
  }

  getAll = () => {
    BooksAPI.getAll.then((books) => {
      this.setState({books})
    })
  }

  // Update change on bookshelf
  updateBookShelf = (book, shelf) => {
    const oldShelf = book.shelf
    if(oldShelf !== shelf) {
      this.setState((prevState) => {
        let books = prevState.books.filter((b) => !(b.id === book.id))
        if(shelf !== 'none'){
          books.push({...book, shelf:shelf})
        }
        return {books: books}
      })
      BooksAPI.update(book, shelf).catch((err) => {
        // Handle sync error
        // Rollback updates
        this.setState((prevState) => {
          let books = prevState.books.filter((b) => !(b.id === book.id))
          if (shelf !== 'none'){
            books.push({...book, shelf: oldShelf})
          }
          return {books: books}
        })
          })
    }

  }
  
  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads books={books} onChangeBookShelf={this.updateBookShelf}/>
        )}/>
        <Route path='/search' render={({ history }) => (
          <Searchpage
            myBooks={books}
            onChangeBookShelf={this.updateBookShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
