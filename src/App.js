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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  changeBookShelf = (book, shelf) => {
    this.setState({
      books: this.state.books.map(
        (b) => b.id === book.id ? Object.assign({}, b, {shelf: shelf}) : b
      )
    })
    //this.setState((state) => ({
      //books: state.books.map((b) => {
        //if(b.id === book.id)
          //b.shelf = shelf
      //})
    //}))

    BooksAPI.update(book, shelf)
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
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default App
