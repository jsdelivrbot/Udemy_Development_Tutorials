# Setup the First App

First of all, get npm installed and go to https://cli.angular.io/ 

Run the following line in the terminal after installing npm:

```bash
sudo npm install -g @angular/cli
```

After installing ng-cli, run the following to create a new project:

```bash
ng new my-first-app
```
`cd` into the new directory and do:

```bash
ng serve
```
This will create the source code. Open the browser and go to `localhost:4200`, you should see the a line stating "app works!".

Open the project in IDE, navigate in to `src` folder where the source code is and we are going to write our code in the `app` folder.

Open the `app.component.html` file, delete all the content and add an input tag here, and simply output it right below the input:

```js
<input type="text">
<p><p>
```
For normal javascript, you need to manually add listener to any change in the input, get the value and access in the paragraph. Angular makes it really simple that all needed to be done is to add `[(ngModel)]="name"` to the input tag, then we go to the `app.component.ts` file, remove the title in `export class` below, and set name initially to empty string:

```js
export class AppComponent {
  name = '';
}
```
Now we have set up the connection, go back to html and wrap name in curly brackets in the paragraph tag:

```js
<input type="text" [(ngModel)]="name">
<p>{{ name }}<p>
```

We then investigate the `app.module.ts` file where we unlock features we can use in our angular app. In order to make the above code working, we need to import some features in the module file.

In the `imports` session in `@NgModule`, add `FormsModule` to the array. It shows error immediately due that angular doesn't know what type of module it is, thus we need to import it at the top:

```js
import { FormsModule } from '@angular/forms';
```
Go to the browser, you should see the input tag working.

### Setup Bootstrap

Instead of adding everything manually, there is a much more elegant way of executing through terminal. For instance, installing bootstrap, navigate to my-first-app directory

```bash
npm install --save bootstrap
```
then go to `.angular-cli.json` file, find the styles session, and add the directory of bootstrap into the array.

>This styles property in the json file defines the global css properties throughout entire project. You can find the `styles.css` file inside originally referring to the `styles.css` in `src` directory.

```js
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.css"
],
```
### How an Angular App gets loaded and started

We first delete the input tag and the name property bond to it in the component file. Then we investigate in how the app was loaded and started.

If we go to the component file, we can see text holding `'app-root'` which is exactly same as in the main `index.html` file in `src` directory.

...loaded into a `bundle.js`...

...to be finished

### Components

First of all, we try to create a new component named server. In app directory, create a folder called server and navigate into the folder and touch file `server.component.ts`.

> - It's a convention to have the folder name equals the component name to avoid confusions.
> - A component is simply just a hyper class so that Angular is able to instantiate to create objects that based on the blueprint we setup here.

We open the server component and export the class:

```js
export class ServerComponent {

}
```
> Once again, good habit to have the exported class same name as the component

In order to tell angular that this is not a normal typescript class but something special, we need to add a class decorator above to enhance the component you are exporting:

In order to make the decorator working, we need add imports at the very top of the file:

```js
import { Component } from '@angular/core';
```
The decorator has a javascript class within it. The very first thing to specify in the decorator is the `selector`.

> The `selector` is the html tag we used in the template representing the component and should be a string. It has to be sure that each selector is unique that they don't accidentally override conventional default or other existing elements.

Another thing essential to specify is the template, here we use the `templateUrl` as key, and the value is the directory of the `server.component.html`.

```js
@component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
```
For letting the app know the existence of the server component, we need to import it in the `app.module.ts` file in the array after `declarations`:

```js
declarations: [
  AppComponent,
  ServerComponent
],
```
Once again, we need to import at the top of the file:

```js
import { ServerComponent } from './server/server.component'
```
Instead of loading the `<app-server>` in the main `index.html` file, we load it in the `app.component.html` file. Go to the browser and you will find the sentence 'server works!' loaded in the webpage.

### Creating Components with CLI & Nesting Components

For instance, if we want to create a multiple servers component, we can type in the terminal:

```bash
ng generate component servers
```
or for short:

```bash
ng g c servers
```
then we can find the directory generated with one html, one css, one component.ts and on spec file generated. 

> The spec file is basically used for testing which we can delete at this stage first.

After that, we load the single server component in the servers component's html file:

```html
<app-server></app-server>
<app-server></app-server>
```
>Similarly, we need to import it in the `app.module.ts` file. However, you should be surprised to find it already there this time due that we used the `ng generate component` command which automatically generates all the routes of accessing and referencing.

### Working with Template & Style

Instead of using `templateUrl` in the `@Component` decorator, if we use `template` directly, then what expected in in the value is the direct html template. If we delete everything in html file and type the following into the value after `template`:

```js
template: `
  <app-server></app-server>
  <app-server></app-server>
`,
```
and open the browser, we expected the same result as before.

Similarly, if we type use `styles` instead of `styleUrls`, we may type the following:

```js
styles: [`
    h3 {
      color: dodgerblue;
    }
`]
```
and open the browser, you can see the dodger blue color vividly updated. 

### Selector Intepretation

For selector, instead of placing `app-servers` directly in string, if we wrap it within a square bracket:

```js
selector: '[app-servers]',
``` 
now the selector has been changed to a attribute selector. Therefore, `<app-servers></app-servers>` won't be working any more and will return an error. Instead, using a div element with `app-servers` attribute will work: 

```html
<div app-servers><div>
```
Apart from attribute selector, we could also use class selector where 

```js
selector: '.app-servers',
``` 
which looks just like CSS selectors has been placed after the `selector` key. Now the working selector should be 

```js
<div class="app-servers"><div>
```
## Binding

### String Interpolation & Data Binding

We first add two properties:

```js
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';
}
```
Then we output these two properties in the template.

```html
<p>{{ 'Server' }} with ID {{ serverId }} is {{ serverStatus }}</p>
```
Go to the browser and you will see: Server with ID 10 is offline

> `serverId` property returns a number which can be resolved easily to a string thus still working with string interpolation in the paragraph.

We can place a method within the string interpolation as well. We define a `getServerStatus()` method in the export:

```js
getServerStatus() {
  return this.serverStatus;
}
```
and change in the string interpolation in the paragraph in html file to 

```html
<p>{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}</p>
```
which should return the same results in the browser at this stage.

### Property Binding

Now, we want to add an add server functionality, we first add a boostrap button in the servers html file:

```html
<button class="btn btn-primary">Add Server</button>
```
and comment out the template previously defined in .ts file and redefine back to `./servers.component.html` file.

In order give the button some functionality, we add a property `allowNewServer` in the class and set it to `false`. Disable the button first and later work with some dynamic data:

```html
<button 
  class="btn btn-primary"
  disabled>
  Add Server
</button>
```
Go to the browser and you will find the button can not be pressed.

Then in `constructor` method, we add a `setTimeOut` function and let the `allowNewServer` to be `true` after 2 seconds. 

```js
constructor() {
  setTimeout(() => {
    this.allowNewServer = true;
  }, 2000);
}
```
> ES6 syntax `() => {}` almost like `function() {}`, `()` holding arguments, `{}` holding function body.

In order to make the button connected with `allowNewServer` value, we enclose the `disabled` property with square bracket and equal to `!allowNewServer`(since we want to disable the button when the `allowNewServer` value is not true):

```html
<button 
  class="btn btn-primary"
  [disabled]="!allowNewServer">
  Add Server
</button>
```

> Square bracket in Angular indicates we are using property binding with dynamic values.
>
> In this case, `disabled` needs a boolean value returned, whereas `allowNewServer` returns either `true` or `false` thus satisfy the condition, so we can directly write `[disabled]="!allowNewServer"` as a property.

#### Property Binding vs String Interpolation

Below the button, if we want to print the current value of the property `allowNewServer`, we can use either:

- String Interpolation:

```html
<p>{{ allowNewServer }}</p>
```
- Property Binding

```html
<p [innerText]="allowNewServer"></p>
```
both give the same result at this instance.

> Between the quotation marks of Property Binding , you can and must write typescript expressions which will return the value this property expects. In this case, for `[disabled]`, it expects `true` or `false`. 

### Event Binding

After the button being able to be clicked, if we want the button to do something once we click it, we need to add event to it.

First, create a new property in the class:

```js
serverCreationStatus = 'No server was created!';
```
Instead of outputting data, we want to listen to some event, so we need to add another method below `ngOnInit`:

```js
onCreateServer() {
  this.serverCreationStatus = 'Server was created!';
}
```
> the `on` at the beginning of the method name symbolised and makes clear that this will be triggerd from within the template. This convention makes it easier to understand who will call this method.

If we want to listen to the event here, we can utilise the typical click attribute in the html element `onClick=""` or use event binding which wrap the event by parenthesis and the method executed `onCreateServer()` after the equal sign:

```html
<button 
  class="btn btn-primary"
  [disabled]="!allowNewServer"
  (click)="onCreateServer()">
  Add Server
</button>
<p>{{ serverCreationStatus }}</p>
```
Switch back to the browser, originally the `<p>{{ serverCreationStatus }}</p>` under the button was returning false. After pressing the button, the text changed to true indicating we are triggering our custom method of  `onCreateServer()` in the .ts file. 

#### Passing Data with Event Binding

Create a label tag and an input tag above the button. Allow the user to enter the name of the server which should get created. 

```html
<input 
  type="text" 
  class="form-control" 
  (input)="onUpdateServerName($event)"
>
<p>{{ serverName }}</p>
```
> The "dollar sign event " `$event` is kind of reserved variable name that we can use the template when using event so between these quotation marks can be captured as argument and send to the method we are calling.

Add this method to the component allow it to output what the user entered.

```js
onUpdateServerName(event: any) {
  console.log(event);
  this.serverName = (<HTMLInputElement>event.target).value;
}
```
and define a `serverName` property to empty string above:

```js
serverName = '';
```
Go to browser and type something in the input tag, you will find the `<p>{{ serverName }}</p>` below returning the stuff you enter. 

#### Two Way Data-Binding

There is an easier way of two way data binding here. We first copy and comment out the entire input tag above, paste and delete the `(input)="onUpdateServerName($event)"` part and change to:

```html
<input 
  type="text" 
  class="form-control" 
  [(ngModel)]="serverName"
>
```
> To be able to use `ngModel`, the `FormsModule` from `@angular/forms` needs to be added to your import array in the AppModule: `imports: [  FormsModule ],`

The `ngModel` setup here will trigger on the input event and update the value of server name in our component automatically. On the other hand since it is two way binding it will also update the value of the input element if we change the server name somewhere else.

We can demostrate this by preset the property: `serverName = 'TestServerInitial';`, and uncomment the previous input tag. If we go to the browser, you can see the second input tag has 'TestServerInitial' originally there and the paragraph below returning the same value, but the first input tag has nothing in it. If you type something in the first input tag, the p-tag will return immediately the stuff you wrote. But if you type in the second input tag, the first input tag is not getting changed due that it is not two-way data binding.

Lastly we combine different ways of data binding together by updating the `onCreateServer` method:

```js
onCreateServer() {
  this.serverCreationStatus = 'Server was created! Name is' + this.serverName;
}
```
and comment out the p-tag stating `serverName` instantly and the first input tag. 

Now we go to the browser, type something into the input tag and then press the button 'Add Server', the updated server name will be shown below the input.




















