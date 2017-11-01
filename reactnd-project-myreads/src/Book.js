import React, {Component} from 'react'
import PropTypes from 'prop-types'

class MyBooks extends Component {

  static propTypes = {
    shelf: PropTypes.string.isRequired,
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string.isRequired,
      }),
      shelf: PropTypes.string,
    }),
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  handleChange = (event) => {
    this.props.onUpdateBookShelf(this.props.book, event.target.value)
  }

  render() {
    const {book, shelf} = this.props
    const authors = book.authors ? book.authors.join(', ')  : ''
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={shelf} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <a href={book.previewLink} target="_blank">
          <div className="book-title">{book.title}</div>
        </a>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}
export default MyBooks