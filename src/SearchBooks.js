import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {

  static propTypes = {
    onBookShelf: PropTypes.func.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

  state = {
    books: [],
    query: ''
  }

  /**
   * @description Handle the change event from the input control.
   * @param {object} e - The callback event
   */
  handleChange = (e) => {
    const query = e.target.value
    this.setState({ query: query })
    this.setState({ books: [] })
    if (query !== '') {
      BooksAPI.search(query).then((books) => {
        books.map((book) => book.shelf = this.props.onBookShelf(book.id))
        this.setState({ books })
      })
    }
  }

  render() {
    const { books, query } = this.state
    const { onChangeBookShelf } = this.props

    if(books)
      books.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              minLength={2}
              debounceTimeout={300}
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
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

export default SearchBooks
