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
onSubmit={this.onFormSubmit}
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
    {

```
After this, we go back to the documentation and sign up and take the API key, and go back to the IDE, open the action folder, In `actions/index.js`, asign this key:

```js
const API_KEY = 'ee74d7e4ba8024a1fc434db577fe8369';
```
and this is the API key we are going to make use of when we make the actual request.

### Introduction to Middleware

We first look at the diagram similar to we have seen before:

<p align="center">
    <img src="./middleware_structure_diagram.jpg" align="center" width="700px" />
</p>

This diagram specify the action creator cycle in a redux application. When user calls the action creator that returns action, the action flows into the reducer, the reducer assemble a new global application state and then that gets injected back into our application. 

>**Note**: Comparing with the previous cycle, we got one more step added into the system, the middleware. **Middleware** is a function that take an action and depending on the actions type and the actions payload or any other number of factors the middleware can choose to let the action pass through, it can manipulate the action before they reach any reducer. We can think of these middlewares as gatekeepers.

This section, we are going to `redux-promise`. Go to https://www.npmjs.com/package/redux-promise, follow the instruction:

```bash
npm install --save redux-promise
```
Then, in root directory `src/index.js`:

```js
import ReduxPromise from 'redux-promise';
```
and we are going apply that middleware by adding it in the first parenthesis of `applyMiddleware()(createStore)`:

```js
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
```

### Ajax Request with Axios

In this section we are going to work on creating actual Ajax request.

Inside `action/index.js`, we are going to create an action creator that is going to be responsible for making an API request to go fetch our weather data. Similarly, we create a new function and export it so it can be used by other files:

>**Note:** Remember action creators always have to return an action and an action is an object which always return an action which always have a `type`:

The last time we created an action creator, the type was a string. This time we try to extract the string in a separate function above the action creator: 

```js
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather() {
    return {
        type: FETCH_WEATHER
    };
}
```
>The purpose of doing so is to keep the action type consistent between our action creators and our reducers. Later this variable will be import to the reducer and we don't have to referencing complicated strings between different files.

To make our API request we need to put together our request URL. Go to weather map and copy the url: http://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b1b15e88fa797225412429c1c50c122a1

Switch back to `actions/index.js`, under the line of the definition of `API_KEY`:

```js
const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=London,us&appid=b1b15e88fa797225412429c1c50c122a1';
```
> `http://api.openweathermap.org/data/2.5/forecast?` is the part of route, domain and path;
> `q=London,us` is the query;
> `appid=b1b15e88fa797225412429c1c50c122a1` is the application id which should be our API key instead. 

We need to clean up the url by:

- Deleting everthing in query part (including `&` sign);
- Delete everything after the equal sign of the `appid`; 
- Add `+ API_KEY` behind the url

```js
const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY;
```
Alternatively, we could exploit the ES6 syntax using dollar sign and curly bracket:

```js
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
```
After that, by looking at the documentation:

---

API call:
api.openweathermap.org/data/2.5/forecast?q={city name},{country code}

---

we could find that the url consist of `q={city name},{country code}`, thus we pass an argument of `city` into the `fetchWeather()` function. Then we adopt the pattern above into the function by defining `const url`

```js
const url = `${ROOT_URL}&q=${city},us`;
```
> To simplify the process, we make the country code static using `us` (united states) or now.

In order to get the url for ajax request, we need to install a package called Axios from ternminal

```bash
npm install --save axios
```
>**Note:** Axios is solely made for making AJAX requests from the browser which works almost identical to Jquery.

Then at the top of the file, we are going to import Axios library

```js
import axios from 'axios';
```
then below `const url`, write the line to get the url above and return a promise:

```js
const request = axios.get(url);
```
Lastly, we are going to pass that request into our action as payload:

>**Note:** payload is an optional property that goes along with actions that can contain some additional data that describes this particular action.

```js
return {
    type: FETCH_WEATHER,
    payload: request
};
```

### Redux-Promise in Practice

Switch back to the search bar file. We first import  several stuff at the top:

```js 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWeather } from "../actions/index";
```
At this stage, switch back to the browser and check if there is error logged in the console.

The goal of this session is to hook up the action creator `fetchWeather` to the `SearchBar` container. Once again, we go to the very below and define the function `mapDispatchToProps(dispatch)`:

```js
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch);
}
```
> **Note:** this cause the action creator whenever it gets called, returns an action `bindActionCreators` make sure that action flows down into the middleware and then the reducers inside of our redux application.

After we have got our `mapDispatchToProps`, we make the `export`:

```js
export default connect(null, mapDispatchToProps)(SearchBar);
```
and delete the `export default` above for the `SearchBar` component

> **Note:** previously when we had components that we used `mapDispatchToProps` or `mapStateToProps`, we never use `null` as the first argument. The reason we are passing null in here is that whenever you are passing through a function that is supposed to map our dispatch to the props of our containers, it always goes in as the second argument. By placing a `null` here, it indicates that `redux` is maintaining some state but this container doesn't care about it at all.

After that, inside of `onForSubmit`, where user try to search for given city:

```js
this.props.fetchWeather(this.state.term);
this.setState({ term: '' });
```
> Empty string will cause the component to re-render the input, a value of `this.state.term`

Now, if we switch back to the browser, type random stuff into the search bar and enter.for instance New York and click submit, we will get the following error returned:

```bash
Uncaught TypeError: Cannot read property 'props' of null
```
>**Note:** This has been cause by the same issue as before, when we have a callback that we pass to a JSX element `onSubmit={this.onFormSubmit}` to the DOM, which reference to `this` in the function `onFormSubmit()` above, we need to bind the context in the `constructor` exactly same as the issue for `onInputChange`.

In the constructor, we type:

```js
this.onFormSubmit = this.onFormSubmit.bind(this);
```
Now, switch back to the browser and type in 'New York' again, open the network, XHR in inspection, you will see response similar to below in the preview tag:

```
{cod: "200", message: 0.0037, cnt: 40,…}
  city: {id: 5128581, name: "New York", coord: {lat: 40.7143, lon: -74.006}, country: "US"}
    coord: {lat: 40.7143, lon: -74.006}
      lat: 40.7143
      lon: -74.006
    country: "US"
    id: 5128581
    name: "New York"
  cnt: 40
  cod: "200"
  ...
```

Then, we need to work on figuring out how we can work with data coming back. To get started on this, we need first create a new reducer for handling the fetch weather action.

```bash
touch src/reducers/reducer_weather.js
```

```js
export default function(state = null, action) {
    console.log('Action received', action);
    return state;
}
```
> The first argument is always our state for this particular piece of state that the user is responsible for, defaulted to `null` and the second argumnet is always our action.

We need to make sure this reducer is actually being made use of by adding it to our combined reducer in `reducer/index.js`. Under first import:

```js
import WeatherReducer from './reducer_weather';
```
and this will be responsible for the weather part of our state:

```js
const rootReducer = combineReducers({
    // state: (state = {}) => state
    weather: WeatherReducer
});
```
In `actions/index.js`, in `fetchWeather()` function, add:

```js
console.log('Request:', request);
```
> What happens in the application: a user enters the search term, they submit the form that calls the action creator `fetchWeather` and passes in the `city`. We then crap the url with the city and make an AJAX request with axios and axios returns a promise. The promise doesn't actually contain any of our data, we are returning the request on the `payload` key.

Now inside the action creator we have the console log of the request; in the reducer we are console loggin the entire action which should have that same exact payload. 

- Switch to the browser and refresh the page, we should get 3 console logs all containing: `Action received` with the type of redux after it. 
- In the search bar, search for San Francisco, and click submit, you will find two console logs back, one is `Request: Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}...` which is definitely coming from the action creator as it is where we set console log request, and then we have also got `Action received` which is coming the reducer.

> **Note:** if we expand the second console log to check the actual response request here, we should see:
> 
> ```
> coord: {lat: 37.7749, lon: -122.4195}
> country: "US"
> id: 5391959
> name: "San Francisco"
> ```
>The payload we returned supposed to go stright over to the reducers as `actions`, but now instead of being a promise on the `payload` we have the response there. This is due that redux-promise is a middleware that have the ability to stop or manipulate actions before they hit any reducer. Redux-promise sees this incoming action and looks specifically the payload property. If the payload is a promise, redux-promise stops the action entirely. Once the request finishes it despatches a new action of the same type but with a payload of the resolved request.

##### Flow of Promise

<p align="center">
    <img src="./redux-promise_middleware.png" align="center" width="400px" />
</p>

- We have got our action that returns from the action creator;
- It enters the middleware (specifically redux-promised middleware);
- Redux-Promise check wheter the action has a promise as a payload:
	- If it doesn't, it is not part of Redux-Promise's job and it will just let it pass through and hit the reducers.
	- If it does, stops the action entirely, and only after the promise resolves (the AJAX request finished), create a new action and then sent it through to the reducers.

> Ajax request is asynchronous in nature, if doesn't happen instantly.

Lastly, comment out the two console logs.

### Avoiding State Mutations in Reducers

First we need to figure out what part of the request we want to save. Flip back to the console and take a look at the console, what we care about is the `data` object which contains the city and the list that contains all of the forcasts. Any time get a fetch weather action that comes in, the only piece of data that we really care about is `action.payload.data`.

Next, we need to decide the initial state for our data structure of weather data should be. A user can query for many different cities by entering one city and then searching for another.

<p align="center">
    <img src="./mid-ware_planning.png" align="center" width="650px" />
</p>

We want to show multiple rows from multiple cities at a time. This implies that the data structure here will be a list. For storing all these data in an array, we need to change the initial state of `null` to an array.

```
export default function(state = [], action) {...
```
Next, set up a switch statement in here to handle only the `fetchWeather` action. Before that, we first import the `FETCH_WEATHER` we previously defined in `action/index.js`: 

```js
import { FETCH_WEATHER } from "../actions/index";
```
then we carry on with the switch statement:

```js
switch (action.type) {
    case FETCH_WEATHER:
        return [ action.payload.data ];
}
```
In this case we are just returning a certain state every time instead of collecting it. In order to collect, we modify the line to:

```js
return state.concat([action.payload.data]);
```
> **Note:** Remember that for React-Redux, we are not mutating the state but returning a new instance of state each time, Instead of using `state.push([action.payload.data]);`, we use `state.concat([action.payload.data]);` to achieve the goal as `concat()` will include all old and new data without changing the existing array, but creating a new array. This is a very common trap for React-Redux to accidentally mutate the state over time.

To utilise the convenience of ES6 syntax, instead of using `concat()`, we can write:

```js
return [ action.payload.data, ...state ];
```
> What the three-dot does is taking all of the entries inside of it and insert it into this new outside array, right like flatten. This will end up with an array like `[ city, city, city]` instead of `[ city, [ city, [ city ] ] ]`

### Building a List Container

> **Note:** Each time we are adding something new component to be rendered, we always think of the question whether it's a component or a container. In this case, the purpose is to render the list of cities which is definitely going to get access to the redux state to get access to it thus prefers a container.

Inside the `container` folder, we make a new file:

```bash
touch src/containers/weather_list.js
```
Do the usual boiler plate first:

```js
import React, { Component } from 'react';

export default class WeatherList extends Component {
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        );
    }
}
```
> Our list shows all the different cities is going to be a html table, thus we put a table element of name `"table table-hover"` from Bootstrap.

Then, make sure render this component inside of the app, flip to `../components/app.js`:

```js
import WeatherList from '../containers/weather_list';
```
and show that list directly underneath the existing search bar:

```js
return (
    <div>
        <SearchBar />
        <WeatherList />
    </div>
);
```
Switch to the browser and refresh, you should see the column header of 'City' being rendered below the search bar.

Trace back to the diagram again:

<p align="center">
    <img src="./mid-ware_planning.png" align="center" width="650px" />
</p>

We have four headings of City, Temperature, Pressure and Humidity, so we can add these to the render list:

```html
<tr>
    <th>City</th>
    <th>Termpature</th>
    <th>Pressure</th>
    <th>Humidity</th>
</tr>
```
Then we need to do the individual rows inside the table body `<tbody>` tag.

We need to get our data into this component because it is a container, thus we have to import the connect function and define the function `mapStateToProps` and then pul the wether data into our container.

- At the top:

```js
import { connect } from 'react-redux';
```

- At the bottom:

```js
function mapStateToProps(state) {
    return { weather: state.weather };
}
```
> **Note:** We specifically use the state of weather because we assigned our `WeatherReducer` to the weather key in `combineReducers` in `reducers/index.js` file.

>  **Note:** Once again, we can use ES6 syntax to clean up. We have only one state and from that state pointing our only property: `weather`. We can get access to weather more easily, instead of `state.weather`, just do:
> 
> ```js
> function mapStateToProps({ weather }) {...
> ```
> which defines a variable basically identical to:
> 
> ```js
> const weather = state.weather
> ```
> Then since the key value pair is the same, we can simplify the whole expression to:
> 
> ```js
> function mapStateToProps({ weather }) {
>    return { weather }; // { weather } === { weather: weather }
> }
> ```

Lastly, we need to connect the component with the function `mapStateToProp`. Thus, at the bottom:

```js
export default connect(mapStateToProps)(WeatherList);
```
and **Never Forget** we are not actually exporting the `default class` above any more, instead, we are exporting the connected version of weather list, thus delete the `export default `above.

#### `weather_list.js` file so far:

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Termpature</th>
                        <th>Pressure</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather }; // { weather } === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);
```





