'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('@floating-ui/dom');
var vue = require('vue');

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
