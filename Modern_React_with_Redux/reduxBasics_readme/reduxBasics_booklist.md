# Managing BookList App with Redux

### Reducers

<p align="center">
    <img src="./reducer_diagram.png" align="center" width="550px" />
</p>

We first create file `reducer_books` in `reducers` folder
In the file, we first write a function return array of books:

<p align="center">
    <img src="./reducer_details_digram.png" align="center" width="550px" />
</p>

```js
function() {
    return [
        { title: "Javascript: The Good Parts", pages: 101 },
        { title: "Harry Potter", pages: 39 },
        { title: "The Dark Tower", pages: 85 },
        { title: "Eloquent Ruby", pages: 1 }
    ];
}
```
now we have our reducer which is just a function and returns a pice of our application states a list of books and to make use of this reducer aywhere else within our project we need to export this function.

```js
export default function() { ...
```
Then we need to wire into our application, we do this inside `index.js`, following the boilplate code:

```js
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    state: (state = {}) => state
});

export default rootReducer;
```
We got a key of books and the value is the output of the books reducer

Delete `state: (state = {}) => state`, and mapping the reducer following the boilplate:

```js
books: BooksReducer
```
and import the book reducer file:

```js
import BooksReducer from "./reducer_books";
```

### Containers

In order to make sure the code is actually generating usable state for application, we are going to do this by creating a booklist component within react. So we go to the `components` folder and create `book-list.js`:

```js
import React, { Component } from "react";

export default class BookList extends Component {
    render() {
        return(
            <ul className="list-group col-sm-4">
            
            </ul>
        )
    }
}
```
Now we are going to pull the list building out a separate function called render list inside the unordered list:

```js
{this.renderList()}
```
then we call a new function render list and we are going to wire up the list of books to be on `this.props`

```js
renderList() {
    return this.props.books
}
```
and we'll map over that array and for each element in the array will return an `<li>` with the class name of `"list-group-item"` and inside we put `book.title` and set the key to the unique value of `book.title`:

```js
renderList() {
    return this.props.books.map((book) => {
        return (
            <li key={book.title} className="list-group-item">{book.title}</li>
        );
    });
}
```
Now we to plug in our application state into `this.props.books`. This is a merger that we saw in the previous state diagram when we combine our react views and redux state to generate what we called a usable application. 

>Connecting these two separate libraries reduxand react is done by separate package called react-redux which is already included in this boilerplate package so we can make use of it right away. 

We are going to define one of our components as a container which is a react element that has a direct connection to the state managed by redux. We are going to promote one of these components to a container.

Cut `book-list.js` and paster into the `container`

> A container is just a component that has direct access to the state that's produced by redux. React redux are two separate libraries and it's only through this third library called react-redux that we can forge a connection and mould two together and get a component that's actually aware of the state that is contained within redux.

First thing is to import library on the top:

```js
import { connect} from 'react-redux';
```

Then, we define a function below, whatever returned in this object will be set equal to `this.props` of our component.

```js
function mapStateToProps(state)  {
    // Whatever is returned will show up as props inside of BookList
    return {
        book: state.books
    };
}
```
>`mapStateToProps()` function which acts as a glue is especially key here, the first argument is the state and it returns an object, and whatever object is returned will be available to the component as `this.props`. 
>Whenever the `state` changes, this container will instantly rerender with the new list of books 

At the very bottom we need to actually make use of that connect function, take the component of `mapStateToProps()` and return a container which will be export from this file.

```js
export default connect(mapStateToProps)(BookList);
```

>the `export default` at the very bottom is the container we want to export, and thus deleted the `export default` on the top. `connect` takes a function and a component and produces a container.

### Selecting

Our books producer always returns the same list of books, in other words our application state is always the same. We don't have the ability to change the state over time due that it's static. In order to implement the states dynamically, we need to bring in a new concept of action creator.

<p align="center">
    <img src="./action_creators_diagram.png" align="center" width="650px" />
</p>

This is the diagram of the lifecycle of an action and a redux application. Most everything starts with an event triggered by a user either directly or indirectly. This event could be clicking a button, selecting books from dropdown. It can also be indirect like AJAX request finishing loading up or a page initially loading up on the actual web page finishing loading. All of these events can optionally call an action creator. 

An _**action creator**_ is a function that returns an object of actions. The object has a type that describes the type of action that was just triggered. That object has been automatically sent to all the different reducers inside our application. Reducers can choose depending on the action to return a different piece of state depending on what the action is. The newly returned piece of state then gets peped into the application state and then application state then gets pumped back into react application which causes all of our components o re-render.

Create the `actions` directory and touch `index.js`

Now we are going to create a single action creator called `selectBook`. Action creator is just a function 

```js
export function selectBook(book) {
    console.log('A book has bee selected:', book.title);
}
```
Then we need to further connect the component in `BookList` by binding the select book action to this `BookList` component. 

- At the top, we first import the action creator `selectBook`;
- Then we import a library called `bindActionCreators`:

```js
import { selectBook } from "../actions/index";
import { bindActionCreators } from 'redux';
```
>`bindActionCreators` is a function by an action creator is what we are going use to make sure that the action is generated by the action creator actually ends up flowing through all the different reducers.





















