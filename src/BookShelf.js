import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <li key={book.id}>
              <Book book={book} onChangeBookShelf={props.onChangeBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired
}

export default BookShelf
