import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {title, books, onChangeBookShelf} = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onChangeBookShelf={onChangeBookShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
