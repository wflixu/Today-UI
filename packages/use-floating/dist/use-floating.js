(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@floating-ui/dom'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', '@floating-ui/dom', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUIReactDOM = {}, global.FloatingUIDOM, global.vue));
})(this, (function (exports, dom, vue) { 'use strict';

  function useFloating(_temp) {
    var _ref = _temp === void 0 ? {
      strategy: 'absolute',
      placement: 'bottom'
    } : _temp,
        middleware = _ref.middleware,
        placement = _ref.placement,
        strategy = _ref.strategy;

    var reference = vue.ref(null);
    var floating = vue.ref(null);
    var returnData = vue.reactive({
      // Setting these to `null` will allow the consumer to determine if
      // `computePosition()` has run yet
      x: 0,
      y: 0,
      strategy: vue.unref(strategy),
      placement: vue.unref(placement),
      middlewareData: {}
    });

    var update = function update() {
      console.log('update:start', reference.value, floating.value);

      if (!reference.value || !floating.value) {
        return;
      }

      dom.computePosition(reference.value, floating.value, {
        middleware: middleware,
        placement: vue.unref(placement),
        strategy: vue.unref(strategy)
      }).then(function (data) {
        console.log(data);
        Object.assign(returnData, data, {
          x: vue.ref(data.x),
          y: vue.ref(data.y)
        });
      });
    }; // useLayoutEffect(update, [update]);


    vue.watchEffect(update); // const setReference = (el: Element ):void => {
    //   reference.value = el;
    // }
    // const setFloating = (el: Element ):void => {
    //   floating.value = el;
    // }

    return Object.assign(returnData, {
      refs: {
        reference: reference,
        floating: floating
      },
      reference: reference,
      floating: floating
    });
  }
  var arrow = function arrow(options) {
    var element = options.element,
        padding = options.padding;
    return {
      name: 'arrow',
      options: options,
      fn: function fn(args) {
        if (vue.isRef(element)) {
          if (element.value != null) {
            return dom.arrow({
              element: element.value,
              padding: padding
            }).fn(args);
          }

          return {};
        } else if (element) {
          return dom.arrow({
            element: element,
            padding: padding
          }).fn(args);
        }

        return {};
      }
    };
  };

  exports.arrow = arrow;
  exports.useFloating = useFloating;
  Object.keys(dom).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
      enumerable: true,
      get: function () { return dom[k]; }
    });
  });

  Object.defineProperty(exports, '__esModule', { value: true });

}));
