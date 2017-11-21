# Weather App

Start from the beginnin as usual, git clone from [online repo of ReduxSimpleStarter](https://github.com/StephenGrider/ReduxSimpleStarter) and install all the dependencies: ```npm install```

Then ```npm start``` and flip to the web browser and check if the line: "React simple starter" is presenting to ensure it works.

<p align="center">
    <img src="./mid-ware_planning.png" align="center" width="650px" />
</p>

### Component Setup

Firstly, add a container file into src directory: `touch src/container`

We start from creating the search bar: `touch container/search_bar.js`:

```js
import React, { Component } from 'react';

export default class SearchBar extends Component {
    render() {
        return (
            <form className="input-group">
                <input />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}
```
Then we need to make sure insert this into the app component as well in order to make it show on the screen. Therefore we flip to `component/app.js`, at the top, we import it from the search_bar file:

```js
import SearchBar from '../containers/search_bar'
```
and replace the text "React simple starter" with `<SearchBar />`

Switch back to the browser, you will find a input bar with a button on the right presenting.

### Controlled Components and Binding Context

After we set up the container, we have to turn it into a controlled field. 

>A controlled field is a form element where the value of the input is set by the state of our component, instead of the other way around. 

>To create a controlled component, we need to set our state whenever the input is changed, and the state here is referring to our component state instead of the redux level state. These two are completely separate.

To set the state up, we need to initialise it inside of our constructor: 

```js
constructor(props) {
    super(props);

    this.state = { term: '' };
}
```
The value of the input is going to be mapped to `this.state.term`.

>Setting default term to be empty string so that when the input first shows up, it's going to be completely empty.

We update the state over time using a change handler on the input. by replacing the original `<input>` with:

```js
<input
    placeholder="Get a five-day forecast in your favourite cities"
    className="form-control"
    value={this.state.term}
    onChange={this.onInputChange}
/>
```
and define the `onInputChange` function below the `constructor`

```js
onInputChange(event) {
    console.log(event.target.value)
}
```
>**Note:** When we don't have something to update the state in `value={this.state.term}`, it never actually gets displayed, so the value when we type in here is going to stay blank. However, as long as someone type in the search bar,  you can find the content being logged in the console. The value of the input comes from `this.state` term. 

We are not updating that state, so it never appears the text in the search bar, but the keypresses do occur in the console log when we type in texts.

In order to fix this by going ahead setting our state whenever we enter some text in there. We enhance the `onInputChange` function: 

```js
onInputChange(event) {
    console.log(event.target.value);
    this.setState({ term: event.target.value })
}
```
>That's the term for holding the current search term is going to be givne target value.

Switch back to the browser and type something into the search bar, you will find the content you typed in displayed into the search bar, however you will find error returned in the console:

```bash
Uncaught TypeError: Cannot read property 'setState' of undefined
```
>**Note:** Whenever we pass off any event handler like this and then call it, the value of `this` is not going to be our search component as a react component, it will be some mystery context hard to interpretate. Because `this` is not the actual component.

To solve this, we can make this an arrow function:

```js
onChange={() => this.onInputChange}
```
or take a different approach to find the context of `onInputChange` in the `constructor`:

```js
constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
}
```
>**Note:** in the above line, `this` in the right hand side, which is our instance of `SearchBar` has a function called `onInputChange`, `bind` that function to this which is `SearchBar` and then replace `onInputChange` with this new bound instance of function `this.onInputChange` in the left hand side. Basically find the existing instance of `this.onInputChange` and bind and overwrite the local method `this.onInputChange` here.

>**Recap:** if you pass a callback around as a function like `this` in `this.onInputChange` and that callback has a reference to `this` in `this.setState(...)` in `onInputChange()` method, you need bind with the context using: 
>
>```js
>this.onInputChange = this.onInputChange.bind(this);
>``` 
>Or otherwise will return a pretty clear error message stating that the program doesn't know what the fuction `setState()` is. Our component only has one reference to `setState` thus it should be relatively easy to track. This rule could apply to other situations, when a function has not been recognised, the first idea come up should be checking binding the context.










