# Vue Toggle

A simple toggle handle for Vue.js.


## Install

~~~
> sudo npm install @websanova/vue-toggle
~~~    

~~~
Vue.use(require('@websanova/vue-toggle'));
~~~


## Usage

Usage is pretty straight forward.

**NOTE:** You can use colons in the name for separation.

~~~

this.$toggle.show('some:toggle');
this.$toggle.hide('some:toggle');
this.$toggle.visible('some:toggle');
~~~

If you want to watch the toggle to trigger some other events you can pre register it. It will get the component context from where it is called in.

~~~
this.$toggle.register('some:toggle', function (state) {
    console.log(state); // true or false value here.
});
~~~