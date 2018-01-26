module.exports = (function () {

    function _toCamelCase(val) {
        return val.replace(/^([A-Z])|[\s-_:](\w)/g, function(match, p1, p2, offset) {
            if (p2) {
                return p2.toUpperCase();
            }
            
            return p1.toLowerCase();        
        });
    }

    function _getObj(name) {
        var i, ii, obj;

        name = _init.call(this, name).split('.');

        obj = this.watch.data;

        for (i = 0, ii = name.length; i < ii; i++ ) {
            obj = obj[name[i]];

            if ( ! obj) {
                return undefined;
            }
        }

        return obj;
    }

    function _init(name) {
        var i, ii, obj, _name;

        name = _toCamelCase(name);

        _name = name.split('.');

        obj = this.watch.data;

        for (i = 0, ii = _name.length; i < ii; i++) {
            if ( ! obj[_name[i]]) {

                // If last one.
                if (i + 1 === ii) {
                    this.options.Vue.set(obj, _name[i], {
                        visible: false
                    });
                }
                else {
                    this.options.Vue.set(obj, _name[i], {});
                }
            }

            obj = obj[_name[i]];
        }

        return name;
    }

    function Toggle(options) {
        this.options = options;

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
        var i, 
            obj = _getObj.call(this, name);

        for (i in obj) {
            if (i === 'visible') {
                obj[i] = !obj[i];
            }
            else if (obj[i].visible !== undefined) {
                obj[i].visible = !obj[i].visible;
            }
        }
    };

    Toggle.prototype.show = function (name) {
        var i, 
            obj = _getObj.call(this, name);

        for (i in obj) {
            if (i === 'visible') {
                obj[i] = true;
            }
            else if (typeof obj[i] === 'object') {
                if (obj[i].visible !== undefined) {
                    obj[i].visible = true;
                }

                this.show(name + '.' + i);
            }
        }
    };

    Toggle.prototype.hide = function (name) {
        var i, 
            obj = _getObj.call(this, name);

        for (i in obj) {
            if (i === 'visible') {
                obj[i] = false;
            }
            else if (typeof obj[i] === 'object') {
                if (obj[i].visible !== undefined) {
                    obj[i].visible = false;
                }

                this.hide(name + '.' + i);
            }
        }
    };

    Toggle.prototype.flip = function (name) {
        var hide = name.split('.');

        hide.pop();

        this.hide(hide.join('.'));
        this.show(name);
    };

    Toggle.prototype.visible = function (name) {
        return _getObj.call(this, name).visible;
    };

    Toggle.prototype.get = function (name) {
        return _getObj.call(this, name);
    };

    Toggle.prototype.active = function (name) {
        var i,
            active = [],
            obj = _getObj.call(this, name);

        for (i in obj) {
            if (obj[i].visible === true) {
                active.push(i);
            }
        }

        return active;
    };

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