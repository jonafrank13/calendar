# Calendar

> A calendar project

# Live Demo
https://jonafrank13.github.io/calendar/

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run tests
npm run test
```

## Notes

* A sample data has been preloaded into the deployment for ease of access, Data is available only for september 2019
* Internalization has been done with a simple key-pair mechanism internally without usage of 3rd party libraries
* Lots of optimizations are possible some of which i have metioned as to-do in the code
* You can comment out the 'created' lifecycle hook in App.vue in order to remove sample data
* I have taken some liberty to modify the UI a bit to accomodate responsive design and modularity, Mainly, I have moved out the search bar separately as well as moved the month selector separately
* You can do localStorage.clear() to clear out all the stored data from the app
* Test cases are added using cypress, and it's not extensive, Mainly done to showcase the e2e testing capablities

## Author

Jona Frank S
jona.mailbox@gmail.com
