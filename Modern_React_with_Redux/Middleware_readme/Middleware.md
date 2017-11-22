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
>
>Or otherwise will return a pretty clear error message stating that the program doesn't know what the fuction `setState()` is. Our component only has one reference to `setState` thus it should be relatively easy to track. This rule could apply to other situations, when a function has not been recognised, the first idea come up should be checking binding the context.

### Form Elements in React

> **Note:** If we type something in the search bar and hit submit or hit `Enter` ky, the browser will automatically refresh and submit the form as POST request and the url changed to `http://localhost:8080/?`. This is a unanimous behaviour of all browsers. 

As being a single page application, we need to prevent the page from refreshing all the time and we don't want it to change the html documents. 

We can prevent this behaviour by adding an event handler to the form element. We want to handle the submit event on the form and submit being a very particular key-word here. Following the normal react nomenclature for handling DOM events, we are going to pass a new function handler to the property named `onSubmit`:

```js
onsubmit={this.onFormSubmit}
```
into the `<form>` element and define the function above:

```js
onFormSubmit(event) {
    event.preventDefault()
}
```
> This function at this instance basically tell the browser, don't submit the form. 

Now switch to the browser, type something into the search bar and hit submit, the form is not submitting itself. 

>##### **Thinking:** So why do we use a `<form>` not instead use just  `<div>` element?
>We get free functionalities from using a form, whenever users see a search bar, they have kind of an expectation that they should be able to type something in and then just press enter or hit submit. As being a `<form>` element, we get that behaviour for free so we don't have to set up another event handler to define the behaviour when the user hit the enter or click the submit, try to submit the form.

### Working with API's

At the beginning of this session, let's dive into the investigation of the API we are going to use. We type in [http://openweathermap.org/forecast5](http://openweathermap.org/forecast5)  in the browser. Then we find an API that we can use to grab forecasts and wether data in the next five days for a particular city.  

API call:

```
api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
```
>"q" means query

We can click the sample of London: 
http://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b1b15e88fa797225412429c1c50c122a1 
which you should have got somthing returned like the following:

```xml
<weatherdata>
    <location>
        <name>London</name>
        <type/>
        <country>US</country>
        <timezone/>
        <location altitude="0" latitude="39.8865" longitude="-83.4483" geobase="geonames" geobaseid="4517009"/>
    </location>
    <credit/>
    <meta>
        <lastupdate/>
        <calctime>0.0028</calctime>
        <nextupdate/>
    </meta>
    <sun rise="2017-03-03T12:03:03" set="2017-03-03T23:28:37"/>
    <forecast>
        <time from="2017-03-03T06:00:00" to="2017-03-03T09:00:00">
            <symbol number="600" name="light snow" var="13n"/>
            <precipitation unit="3h" value="0.03125" type="snow"/>
            <windDirection deg="303.004" code="WNW" name="West-northwest"/>
            <windSpeed mps="2.29" name="Light breeze"/>
            <temperature unit="kelvin" value="269.91" min="269.91" max="270.877"/>
            <pressure unit="hPa" value="1005.61"/>
            <humidity value="93" unit="%"/>
            <clouds value="scattered clouds" all="32" unit="%"/>
        </time>
        ......
```

> We may notice that this is XML, in order to work with JSON, simply delete `mode=xml&` part in the url, left http://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b1b15e88fa797225412429c1c50c122a1 then we should be getting something back like the following:

```JSON
{
    "cod": "200",
    "message": 0.0032,
    "cnt": 36,
    "list": [
    {
        "dt": 1487246400,
        "main": {
            "temp": 286.67,
            "temp_min": 281.556,
            "temp_max": 286.67,
            "pressure": 972.73,
            "sea_level": 1046.46,
            "grnd_level": 972.73,
            "humidity": 75,
            "temp_kf": 5.11
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ],
        "clouds": {
            "all": 0
        },
        "wind": {
            "speed": 1.81,
            "deg": 247.501
        },
        "sys": {
            "pod": "d"
        },
        "dt_txt": "2017-02-16 12:00:00"
    },
    {......
```
After this, we go back to the documentation and sign up and take the API key, and go back to the IDE, open the action folder, In `actions/index.js`, asign this key:

```js
const API_KEY = 'ee74d7e4ba8024a1fc434db577fe8369';
```
and this is the API key we are going to make use of when we make the actual request.

### Introduction to Middleware









