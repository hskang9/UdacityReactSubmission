import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
const _ = require('lodash');

class MyReads extends Component {

  static propTypes = {
    books: PropTypes.array,
    onChangeBookShelf: PropTypes.func.isRequired,
  }

  render() {
    const bookshelves = _.groupBy(_.sortBy(this.props.books, (book) => this.getShelfOrder(book.shelf)), 'shelf')
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {_.map(bookshelves, (books, shelf) => (
              <div className="bookshelf" key={`bookshelf_${shelf}`}>
                <h2 className="bookshelf-title">{this.getShelfTitle(shelf)}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map((book) => (
                      <li key={`book_${book.id}`}>
                        <Book
                          book={book}
                          shelf={shelf}
                          onChangeBookShelf={this.props.onChangeBookShelf}/>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link className='open-search' to='/search'>Add a book</Link>
      </div>
    )
  }

  getShelfTitle = (shelf) => {
    switch (shelf) {
      case 'currentlyReading': return 'Currently Reading'
      case 'wantToRead': return 'Want to Read'
      case 'read': return 'Read'
      default: return 'None'
    }
  }

  getShelfOrder = (shelf) => {
    switch (shelf) {
      case 'currentlyReading': return 0
      case 'wantToRead': return 1
      case 'read': return 2
      case 'none': return 3
      default: return 4
    }
  }
}

export default MyReads
