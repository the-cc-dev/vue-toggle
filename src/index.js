module.exports = (function () {

    function _toCamelCase(val) {
        return val.replace(/^([A-Z])|[\s-_:](\w)/g, function(match, p1, p2, offset) {
            if (p2) {
                return p2.toUpperCase();
            }
            
            return p1.toLowerCase();        
        });
    }

    function _init(name) {
        name = _toCamelCase(name);

        if ( ! this.watch.data[name]) {
            this.watch.$set(this.watch.data, name, {
                visible: false
            });
        }

        return name;
    }

    function Toggle(options) {
        this.watch = new options.Vue({
            data: function () {
                return {
                    data: {}
                };
            }
        });
    }

    Toggle.prototype.register = function(name, func) {
        name = _init.call(this.$toggle, name);

        if (func) {
            this.$toggle.watch.$watch('data.' + name + '.visible', function (newVal) {
                func.call(this, newVal);
            });
        }
    };

    Toggle.prototype.toggle = function (name) {
        name = _init.call(this, name);

        this.watch.data[name].visible = !this.watch.data[name].visible;
    };

    Toggle.prototype.show = function (name) {
        name = _init.call(this, name);

        this.watch.data[name].visible = true;
    };

    Toggle.prototype.hide = function (name) {
        name = _init.call(this, name);

        this.watch.data[name].visible = false;
    };

    Toggle.prototype.visible = function (name) {
        name = _init.call(this, name);

        return this.watch.data[name].visible;
    }

    return function install(Vue, options) {
        var toggle,
            register;

        options = options || {};

        options.Vue = Vue;

        toggle = new Toggle(options);

        register = toggle.register;

        Object.defineProperties(Vue.prototype, {
            $toggle: {
                get: function() {
                    toggle.register = register.bind(this);

                    return toggle;
                }
            }
        });
    }
})();