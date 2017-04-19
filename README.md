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

**NOTE:** Colons or dashes can be used for separation. If using dots "." it will act on that entire object subset.

~~~

this.$toggle.show('some:toggle');
this.$toggle.hide('some.toggle');
this.$toggle.visible('some:toggle');
this.$toggle.get('some:toggle');
this.$toggle.active('some:toggle');
~~~

To watch the toggle to trigger some other events it can e pre registered. It will get the component context from where it is called in.

~~~
this.$toggle.register('some:toggle', function (state) {
    console.log(state); // true or false value here.
});
~~~

