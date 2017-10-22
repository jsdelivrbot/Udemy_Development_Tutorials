#Common Bugs/Problems (some stupid)

##Error installing node-sass

Error code in terminal:

```
npm ERR! node-sass@4.5.3 postinstall: `node scripts/build.js`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the node-sass@4.5.3 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/rh3014/.npm/_logs/2017-09-06T20_03_32_244Z-debug.log
```
###in a mess, but all useful resourcing handling error, tidy up later

<https://github.com/sass/node-sass/blob/master/TROUBLESHOOTING.md>
<https://docs.npmjs.com/getting-started/fixing-npm-permissions#option-2-change-npms-default-directory-to-another-directory>

mkdir ~/.npm-global
Configure npm to use the new directory path:

npm config set prefix '~/.npm-global'
Open or create a ~/.profile file and add this line:

export PATH=~/.npm-global/bin:$PATH
Back on the command line, update your system variables:

source ~/.profile
Test: Download a package globally without using sudo.

   npm install -g jshint
Instead of steps 2-4 you can also use the corresponding ENV variable (e.g. if you don't want to modify ~/.profile):

   NPM_CONFIG_PREFIX=~/.npm-global

```
rm -rf node_modules
rm package-lock.json
npm cache clean
npm install
```
```
sudo npm install --unsafe-perm -g node-sass
sudo npm install --unsafe-perm node-sass
```



###to successfully install node-sass

delete node_modules directory, then:

```
$ sudo npm cache clean
$ sudo npm cache verify
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
$ sudo npm i --unsafe-perm node-sass
```

##Cannot find module '@angular/compiler-cli' when running ng serve

Error code in terminal:

```
The "@angular/compiler-cli" package was not properly installed. Error: Error: Cannot find module '@angular/compiler-cli'
Error: The "@angular/compiler-cli" package was not properly installed. Error: Error: Cannot find module '@angular/compiler-cli'
    at Object.<anonymous> (/usr/lib/node_modules/@angular/cli/node_modules/@ngtools/webpack/src/index.js:14:11)
    at Module._compile (module.js:573:30)
    at Object.Module._extensions..js (module.js:584:10)
    at Module.load (module.js:507:32)
    at tryModuleLoad (module.js:470:12)
    at Function.Module._load (module.js:462:3)
    at Module.require (module.js:517:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/usr/lib/node_modules/@angular/cli/tasks/eject.js:10:19)
    at Module._compile (module.js:573:30)
    at Object.Module._extensions..js (module.js:584:10)
    at Module.load (module.js:507:32)
    at tryModuleLoad (module.js:470:12)
    at Function.Module._load (module.js:462:3)
    at Module.require (module.js:517:17)
    at require (internal/module.js:11:18)
```

#####Uninstall and clean (global)

```
rm -rf node_modules dist
npm uninstall -g @angular/cli
npm cache clean
```
#####Reinstall and play (global)

```
npm install -g @angular/cli@latest
npm install
```
###upgrade from "angular-cli" to "@angular/cli" run this:

#####update angular-cli to the latest version

```
npm remove -g angular-cli
npm install -g @angular/cli@latest
```
#####update the project dependencies

```
rm -rf node_modules dist
npm install --save-dev @angular/cli@latest
npm install
```
source: <https://github.com/angular/angular-cli#updating-angular-cli>

##Error installing bundle JSON 1.8.3 is not compatible with ruby 2.4

one solution is to delete gem.lock file and reinstall bundle, bundler won't install json again

another plausible alternative is (might work, might not due to new features of new packages releasing): 

```bash
sudo apt-get install libgmp3-dev
```


##HTTP 500 Internal Server Error

to be honest, for rails app development, in most cases, error 500 is caused due that haven't yet created database

```
rails db:create db:migrate db:seed
```