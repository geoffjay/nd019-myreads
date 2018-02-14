import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import NoMatch from './NoMatch'
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
    BooksAPI.update(book, shelf)
      .catch(error => console.error(error))
      .then(response => {
        this.setState({
          books: this.state.books.map(
            (b) => b.id === book.id ? Object.assign({}, b, {shelf: shelf}) : b
          )
        })
      })
  }

  /**
   * @description Add a book to a shelf.
   * @param {object} book - The book to add to the shelf
   * @param {string} shelf - The shelf to add the book on to
   */
  addBookToShelf = (book, shelf) => {
    const books = this.state.books
    books.push(book)
    this.setState({
      books
    })
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
        <Switch>
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
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default App
