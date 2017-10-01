# <div style="text-align: center">Video Share React App</div>
<hr>

Let's start making a very basic react app from starter code of minimal stuff to make it work.

Go to [https://github.com/StephenGrider/ReduxCasts]() and downdoad the starter code, delete the `src` source folder and start from scratch:

- First of all, create the source folder directory that holds every thing `$ mkdir src`
- Navigate in to the directory `$ cd src` and create the index.js file `$ touch index.js`

Before writing codes, put these few lines of pseudo-code in front of all contents:

```js
// Creating a new component. This component should produce some HTML

// Take this component's generated HTML and put it on the page (in the DOM)
```
which outlines the task we are going to do.

Firstly, we create a function called App under the first line of pseudo code with HTML within it as a JSX form:

```js
const App = function() {
    return <div>Hi!</div>;
}
```
If you go to this online Babel compiler: [https://babeljs.io/repl/]() and type in the code above, you should be expecting this vanilla javascript code returned: 

```js
"use strict";

var App = function App() {
    return React.createElement(
        "div",
        null,
        "Hi!"
    );
};
```
which would be the final code intepreted by the browser after being compiled.

Now if we change the `<div>` element to an `<ol>` element with several `<li>`:

```js
const App = function() {
    return <ol>
    	<li>1</li>
    	<li>2</li>
    	<li>3</li>
    </ol>;
}
```
we should be expecting the following returned:

```js
"use strict";

var App = function App() {
    return React.createElement(
        "ol",
        null,
        React.createElement(
            "li",
            null,
            "1"
        ),
        React.createElement(
            "li",
            null,
            "2"
        ),
        React.createElement(
            "li",
            null,
            "3"
        )
    );
};
```
It can be easily indicated how JSX made the component code a lot more clean and legible.

Now, we start tackling the second issue, rendering. In order to make the render works, we first need to import libraries of react:

```js
import React from 'react';
import ReactDOM from 'react-dom';
```
>Note that react and react-dom are separate libraries, react tackles the creation and management of component elements and react-dom renders it into the DOM.

Next, render the component into the page by typing the following under the second pseudo-code comment:

```js
ReactDOM.render(<App />, document.querySelector('.container'));
```
>Note that the first argument is the component you are going to render. Instead of placing 'App' which is the class, <App /> which represents the instance of the class has been placed. Otherwise, it will give an error: 

>```
Uncaught Error: ReactDOM.render(): Invalid component element. 
Instead of passing a component class, make sure to instantiate it by passing it to React.createElement.
```
>The second element is the exact place we are rendering this component into. By checking the index.html file, we can find this element in the body:

>```html
<body>
    <div class="container"></div>
</body>
```
>where we are rendering all these components.

So a very basic working react app from scratch has been created:

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';

// Creating a new component. This component should produce some HTML
const App = () => {
    return <div>Hi!</div>;
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
```


##React App with Clearer File Structure

In order to make the file modular to get easy accesses and managements, we follow the convention keeping one component each file.

- create a directory storing all components: `mkdir components`
- navigate into the directory and create the four following component files:
	- `touch search_bar.js` which represents the search bar on the top of the page
	- `touch video_detail.js` which holds the information of hte current video playing
	- `touch video_list_item.js` which is a single video in the play list on right hand side
	- `touch vido_list.js` which is the parent component of list items in the nested component of components

--- get youtube API key ---

In index.js file, under `import ReactDOM from 'react-dom'` place the API key. As the API key is not being changed, we use `const`:

```js
const API_KEY = 'WHAT_EVER_YOUR_KEY_HERE';
```
After that, we need to install a npm package to enable the youtube API functionality:

```bash
npm install --save youtube-api-search
```
###Search Bar
Now proceed to create the search bar, open the search bar, create a function returning a input tag:

```js
const SearchBar = () => {
    return <input />
};
```
Even no variables making reference to react yet, we still need to import react at the top to make react in the scope of this file:
 
```js
import React from 'react';
```
This is essential due that we need react to compile JSX to obtain a call like `React.createElement`

Once again, in order to make the file structure modular, we include only one component in each file. Under the SearchBar function, export the Search Bar:

```js
export default SearchBar
```
Now in order to make use of it, switch back to the index.js file and import:

```js 
import SearchBar from './components/search_bar';
```
>Note that we can't direct import from `'search_bar'` unlike the libraries as convention, for example, the `'react'` library is unique, as the program search through the porject, it will find only one library of react. However, as custom importing, we may have several different search bars in different places, thus need to be specific with the directory.

Then open the div and place the search bar into it:

```js
return <div>
    <SearchBar />
</div>;
```
The files should look like the following:

```js
// search_bar.js:
import React from 'react';

const SearchBar = () => {
    return <input />
};

export default SearchBar;
```
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyBYGSqR6RJT-5y0XcJjwJmTSoGN_RYN4Vw';

// Creating a new component. This component should produce some HTML
const App = () => {
    return (
        <div>
            <SearchBar />
        </div>
    );
};

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
```

###Class-Based Components

Navigate to search_bar.js file, delete the SearchBar variable and rewrite it in class based form:

```js
class SearchBar extends React.Component {
    
}
```
>With `extends` presenting, this component can be read as "defining a new class called search bar and give it all the functionality that react component has"

In order to compile the JSX, we still need a render method in side the class:

```js
class SearchBar extends React.Component {
    render() {
        return <input />
    }
}
```
Now we can do some clean up using ES6 syntax: 

- place a `{ Component }` behind `React` in the import line, this basically means: `const Component = React.Component;`
- then take off the `React.` before `Component` in the `extends` statement

The search bar file should be like the following:

```js
import React, { Component } from 'react'; // means const Component = React.Component;

class SearchBar extends Component {
    render() {
        return <input />
    }
}

export default SearchBar;
```

###Handling User Events

Handling events in react has two steps: 

- First, declare and event handler and the event handler is a function that should be triggered whenever the event occurs.
- Second, we pass the event handler to the element that we want to monitor for events. So, in our case, we want to know whenever the input elements inside our input search bar has its text changed.  

Therefore, we define another method that has the same general syntax as the render function:

```js
onInputChange() {

}
```
and pass it onto the `<input />`:

```js
return <input onChange={this.onInputChange} />;
```
>This will basically refer to as a `prop`(property) `onChange` of value of `this.onInputChange`

Then, pass `event` or `eventObject` as argument to the function, console log the target value:

```js
onInputChange(event) {
    console.log(event.target.value);
}
```
>This entire two parts could be replaced by single line arrow function in the input tag:
>
>```js
return <input onChange={(event) => console.log(event.target.value)} />;
```

refresh the page and type something into the input bar, check in the inspection and you will see whatever you typed being logged into the console.

>Note that if you console log `event` instead of `event.target.value`, the console will return you the entire object instead of the specific value you type in, which looks like something below: 
>
```
SyntheticEvent {dispatchConfig: {…}, dispatchMarker: ".0.0", nativeEvent: InputEvent, type: "change", target: input, …}
```

###States
State is a plain javascript object that is used to record and react to user events each class based component that we define has its own state object. Whenever a state is changed the component immediately re-renders and forces all its children to re-render as well. 

Before we ever use a state inside of a component, we need to initialize the state object. To initialize the state, we set the property state to a plain javascript object inside of the class's `constructor` method:

```js
constructor(props) {
    super(props);

    this.state = { term: '' };
}
```
>`Component` itself has its own constructor function. When we define a method that is already defined on the parent class which is component we can call that parent method of parent class by calling `super`

Now we try to update the state. Bear in mind that `this.state = { term: '' };` in the constructor method is only time we set or initialize the state like this throughout the component.

We update the state by replacing the console log in the render function with a `setState` method:

```js
return <input onChange={(event) => this.setState({ term: event.target.value })} />;
```
instead of the console log, now we modify the content after `return`, put them all in parenthesis, create a new div and print out the state by referencing `this.state.term`:

```js
return (
    <div>
        <input onChange={(event) => this.setState({ term: event.target.value })} />
        Value of the input: {this.state.term}
    </div>
);
```
>The javascript variable wrapped the curly bracket is just being referenced instead of being modified like `{this.state.term} = '4'`.

>What has happened here is that whenever we change the input, this function: `(event) => this.setState({ term: event.target.value })` runs because it's the event handler. We set the state with the new value of input. As long as we update the state, this causes the our component to automatically re-render and push all the updated information from the render method into the DOM. 

##Ajax Request

###Youtube API Search

First, import the Youtube Api Search functionality from the youtube package:

```js
import YTSearch from 'youtube-api-search';
```
Under defining the constant `API_KEY`, execute the youtube search using the `API_KEY` and the search term `'surfboards'`:

```js
YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
    console.log(data);
});
```
After this, we can start refactoring the component from a functional component to a class based component. We start with wrapping the items returned into the curly bracket of the render function:

```js
class App extends Component {
    render() {
        return (
            <div>
                <SearchBar />
            </div>
        );
    }
}
```
then we add in the constructor to handle the states, we call the term `videos` here and we put a square bracket for array after the video term because there will be list of video objects contained:

```js
constructor(props) {
    super(props);

    this.state = { videos: [] };
}
```
In order to render some videos into the App initially instead of returning an empty list, we cut the search function above and paste into the constructor under the first assignment of `this.state`. Instead of console log the data, we change the console log to setState function:

```js
constructor(props) {
    super(props);

    this.state = { videos: [] };

    YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
        this.setState({ videos: data });
    });
}
``` 
You may further refactor by 

- replacing the `function` key word with an arrow function;
- replacing the argument `data` with `videos` which makes a lot more sense. As the items of key value pair are now identical: `{ videos: videos }`, we can utilise the advantages of ES6 syntax to simplify and clean up the code to just `{ videos }` as following:

```js
YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
    this.setState({ videos });
    // this.setState({ videos: videos });
});
```

###Video List

Video list parent component doesn't essentially need a state as it's just holding a list of video items that not recording any information of user interactions. So we can just make it a plain functional component returning a `<ul>` first because we are expecting it to hold a list of video items.

```js
import React from 'react';

const VideoList = () => {
    return (
        <ul>

        </ul>
    );
};
```
Next, we are adding a class to the `<ul>`. Deviating from ordinary css classes in html, we use `className` to declare the class instead of `class`. This is for avoiding naming conflict with the key word `class` for the component.

```js
<ul className='col-md-4 list-group'>
```
>Bootstrap has been already referenced in the starter code initially, this class will make a layout of a list group of videos that takes 1/3 of the page width.

After that, we export the component in the bottom so other files can use it as well:

```js
export default VideoList;
```
and import it in the index.js file below the Search Bar:

```js
import VideoList from './components/video_list';
```
place it in the render method below the Search Bar:

```js
render() {
    return (
        <div>
            <SearchBar />
            <VideoList />
        </div>
    );
}
```
Now we start to add in videos. Adding video objects data into the component, we just need to add the state:

```js
<VideoList video={this.state.videos} />
```
and then we modify the video list component to print out the length of objects:

```js
const VideoList = (props) => {
    return (
        <ul className='col-md-4 list-group'>
            {props.videos.length}
        </ul>
    );
};
```
>The `props.videos` here is corresponding to `this.state.videos` in the index file.

Switch to the webpage and refresh the page. If you are cautious enough, you will spot that the number has shown 0 for a half second and swithc to 5. This is due that we initialized our state with an empty array: `this.state = { videos: [] };` then we kick off the search and send the API request: `YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {...`. During that time of searching which normally takes 200ms, the length of the videos array is equal to the length of an empty array of 0.

Navigate to the video list items file, quickly setup a straightforward video list item:

```js
import React from 'react';

const VideoListItem = (props) => {
    return <li>Video</li>
};

export default VideoListItem;
```
Switch back to the list file, import the video list items and create a const videoItem in the Video List function:

```js
const videoItems = props.videos.map((video) => {
    return <VideoListItem video={video} />
});
```
Switch to the browser, refresh and you will see a list of 5 Video items and the following logged in the console:

```
Warning: Each child in an array or iterator should have a unique "key" prop. 
Check the render method of `VideoList`. 
See https://fb.me/react-warning-keys for more information.
```
Adding a key to the list, we need a consistent piece of information unique to that particular record. The common strategy is to use the ID of the data, in this case, we use the etag property of the object by adding in `key={video.etag}` to `<VideoListItem video={video} />`. The Video List file should be looking like the following at this stage:

```js
import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return <VideoListItem key={video.etag} video={video} />
    });

    return (
        <ul className='col-md-4 list-group'>
            {videoItems}
        </ul>
    );
};

export default VideoList;
```
###Manipulating the Video List Items
First, let's make use of some ES6 syntax here. Instead of `props`, we replace the argument of `const VideoListItem` to `{video}` which is same meaning as `const video = props.video`.

Next, we start doing whole bunch of markup after `return`:

```js
<li className="list-group-item">
    <div className="video-list media">
        <div className="media-left">
            <img className="media-object" />
        </div>

        <div className="media-object">
            <div className="media-heading"></div>
        </div>
    </div>
</li>
```
Switch to the browser and refresh, you should see a list of 5 empty blocks. 

In order to render the information of the video items, we first need to define before the returning:

```js
const imageUrl = video.snippet.thumbnails.default.url;
```
then,

- add `src={imageUrl}` to `<img className="media-object" />`
- add `{video.snippet.title}` into the empty div of `<div className="media-heading"></div>`

your current video list item file should look like the following:

```js
import React from 'react';

const VideoListItem = ({video}) => {
    // console.log(video);
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
        <li className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl} />
                </div>

                <div className="media-object">
                    <div className="media-heading">
                        {video.snippet.title}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;
```
Switch to the browser, and you should see 5 blocks each with an image of the video and the title.

###Video Details
-

####Handling Null Props

Now let's quickly create a video detail component:

```js
import React from 'react';

const VideoDetail = ({video}) => {
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}>

                </iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;
```
Import into index file and render before the list:

```js
import VideoDetail from './components/video_detail';
```
```js
render() {
    return (
        <div>
            <SearchBar />
            <VideoDetail video={this.state.videos[0]}/>
            <VideoList videos={this.state.videos} />
        </div>
    );
}
```
Now if we switch to the browser and refresh, we should get this error:

```bash
Uncaught TypeError: Cannot read property 'id' of undefined...
```
This is due that at the very beginning of running the app, the constructor set the video list to an empty array, then run the search function:

```js
constructor(props) {
    super(props);

    this.state = { videos: [] };

    YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
        this.setState({ videos });
        // this.setState({ videos: videos });
    });
}
```
Between the time interval it is searching, the component itself doesn't pause to render itself:

```js
render() {
    return (
        <div>
            <SearchBar />
            <VideoDetail video={this.state.videos[0]}/>
            <VideoList videos={this.state.videos} />
        </div>
    );
}
```
At this instance, the `this.states.videos` was still an empty array, when we access index zero on it we get `undefined`.

So, to fix this, we provide a check inside our video check component to make sure that a video has been provided in the `props` before it attempts to render. We add the following before defining `videoID`, claiming that if no videos are presenting, we return a div stating loading in progress.

```js
if (!video) {
    return <div>Loading...</div>
}
```
Switch to the browser and refresh, you will spot that the term "Loading..." stays for half a second and disappears. Video details render after that.

####Video Selection

In index.js we need to add another state of the app: `selectVideo` and set the default to `null`. Update the class App:

```js
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
        };

        YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        return (
            <div>
                <SearchBar />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        );
    }
}
```
Go to video list item file, add `onVideoSelect` to the argument of the component:

```js
const VideoListItem = ({video, onVideoSelect}) => {...
```
>This is ES6 syntax, which is equivalent to:
>
>```js
const video = props.video;
const onVideoSelect = props.onVideoSelect;
```

Add an `onClick` function to the `<li>` item thus each list item respond to the click action:

```js
<li onClick={() => onVideoSelect(video)} className="list-group-item">...
```
Go the video list file, add the `onVideoSelect` functionality to the returned video list item component:

```js
<VideoListItem
    onVideoSelect={props.onVideoSelect}
    key={video.etag}
    video={video}
/>
``` 
Switch to the browser, and now each list item should be response to your clicking action.

###CSS Styling

```js
.search-bar {
    margin: 20px;
    text-align: center;
}

.search-bar input {
    width: 75%;
}

.video-item img {
    max-width: 64px;
}

.video-detail .details {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.list-group-item {
    cursor: pointer;
}

.list-group-item:hover {
    background-color: #eee;
}
```

###Search for Videos

In order to fulfill the searching functionality, we need to first create a search method separately under constructor and move the YTSearch into the custom search method, change the term `'surfBoards'` to term and define it back to be `'surfBoards'` back into the constructor function:

```js
constructor(props) {
    super(props);

    this.state = {
        videos: [],
        selectedVideo: null,
    };

    this.videoSearch('surfboards');
}

videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({
            videos: videos,
            selectedVideo: videos[0]
        });
    });
}
```
Update the Search Bar component in the render function:

```js
<SearchBar onSearchTermChange={term => this.videoSearch(term)} />
```
Now switch to the search bar file. In order to make the code more modular and well-organised, we take out the event handler function and make a separate `onInputChange` function:

```js
onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
}
```
and update the `onChange` method in `<input />` tag:

```js
onChange={(event) => this.onInputChange(event.target.value)}
```
Switch back to the browser, type some content into the search bar, and you will find the video searching functionality working. 

####Throttling Search Term Input

At this stage, the searching is a bit laggy because the search functionality runs immediately after the user type in the search term. So we need sort of throttling to slow down the frequency of running the searching functionality.

In order to throttle the frequency of running a certain function, we need an external library called lodash, go to the terminal and type:

```bash
sudo npm install --save lodash
```
and after that, import it into the index.js at the very top:

```js
import Lodash from 'lodash';
```
>Instead of using the term `Lodash`, we usually use just underscore `_` in place:
>
>```js
>import _ from 'lodash';
>```

Then we define a variable videoSearch and pass through a `debounce` function from the lodash library: 

```js
const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
```
>The `debounce` function here make sure that the function videoSearch will only run every 300ms.

After that we update the Search Bar component in the render function:

```js
<SearchBar onSearchTermChange={videoSearch} />
```

Switch back to the browser and type some content into the search bar, you will find that the searching functionality doesn't run immediately each time you type stuff in.


