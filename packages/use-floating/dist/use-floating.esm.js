import { arrow as arrow$1, computePosition } from '@floating-ui/dom';
export * from '@floating-ui/dom';
import { ref, reactive, unref, watchEffect, isRef } from 'vue';

function useFloating(_temp) {
  var _ref = _temp === void 0 ? {
    strategy: 'absolute',
    placement: 'bottom'
  } : _temp,
      middleware = _ref.middleware,
      placement = _ref.placement,
      strategy = _ref.strategy;

  var reference = ref(null);
  var floating = ref(null);
  var returnData = reactive({
    // Setting these to `null` will allow the consumer to determine if
    // `computePosition()` has run yet
    x: 0,
    y: 0,
    strategy: unref(strategy),
    placement: unref(placement),
    middlewareData: {}
  });

  var update = function update() {
    console.log('update:start', reference.value, floating.value);

    if (!reference.value || !floating.value) {
      return;
    }

    computePosition(reference.value, floating.value, {
      middleware: middleware,
      placement: unref(placement),
      strategy: unref(strategy)
    }).then(function (data) {
      console.log(data);
      Object.assign(returnData, data, {
        x: ref(data.x),
        y: ref(data.y)
      });
    });
  }; // useLayoutEffect(update, [update]);


  watchEffect(update); // const setReference = (el: Element ):void => {
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
      if (isRef(element)) {
        if (element.value != null) {
          return arrow$1({
            element: element.value,
            padding: padding
          }).fn(args);
        }

        return {};
      } else if (element) {
        return arrow$1({
          element: element,
          padding: padding
        }).fn(args);
      }

      return {};
    }
  };
};

export { arrow, useFloating };
