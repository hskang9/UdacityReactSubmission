import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
const _ = require('lodash')

class SearchPage extends Component {

  static propTypes = {
    myBooks: PropTypes.array,
    onChangeBookShelf: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    books: [],
  }

  updateQuery = (query) => {
    let queryValue = query.trim()
    if (this.state.query !== queryValue) {
      if (queryValue.length > 1) {
        this.searchQuery(queryValue)
        this.setState({
          query: queryValue
        })
      } else {
        this.setState({
          query: queryValue,
          books: []
        })
      }
    }
  }

  getShelf = (book) => {
    let bookInShelf  = _.find(this.props.myBooks, (b) => b.id === book.id)
    return bookInShelf ? bookInShelf.shelf : 'none'
  }

  searchQuery = (query) => {
    BooksAPI.search(query, 10).then((books) => {
      if (!books.error) {
        this.setState({ books })
      } else {
        this.setState({ books: [] })
      }
    })
  }

  clearQuery = () => {
    this.setState({
      query: '',
      books: []
    })
  }

  render() {
    const { books, query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
               placeholder="Search by title or author"
               value={query}
               onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={`book_${book.id}`}>
                <Book
                  book={book}
                  shelf={this.getShelf(book)}
                  onChangeBookShelf={this.props.onChangeBookShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage