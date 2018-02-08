import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class App extends Component {
  state = {
    books: []
  }

  /**
   * @description Fetch the list of books from the API service.
   */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  /**
   * @description Change a book's shelf to a new one that is provided.
   * @param {object} book - The book to change the shelf of
   * @param {string} shelf - The shelf to change the book to
   */
  changeBookShelf = (book, shelf) => {
    this.setState({
      books: this.state.books.map(
        (b) => b.id === book.id ? Object.assign({}, b, {shelf: shelf}) : b
      )
    })

    BooksAPI.update(book, shelf)
  }

  /**
   * @description Add a book to a shelf.
   * @param {object} book - The book to add to the shelf
   * @param {string} shelf - The shelf to add the book on to
   */
  addBookToShelf = (book, shelf) => {
    this.state.books.push(book)
    this.changeBookShelf(book, shelf)
  }

  /**
   * @description Check which shelf a book is on.
   * @param {number} id - The id of the book to check
   * @returns {string} Shelf that the shelf is on
   */
  checkShelf = (id) => {
    for (let book of this.state.books) {
      if (book.id === id) {
        return book.shelf
      }
    }
    return 'none'
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onChangeBookShelf={this.changeBookShelf}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            onChangeBookShelf={this.addBookToShelf}
            onBookShelf={this.checkShelf}
          />
        )} />
      </div>
    )
  }
}

export default App
