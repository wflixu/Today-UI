'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('@floating-ui/dom');
var vue = require('vue');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function useFloating(_temp) {
  var _ref = _temp === void 0 ? {
    strategy: 'absolute',
    placement: 'bottom'
  } : _temp,
      middleware = _ref.middleware,
      placement = _ref.placement,
      strategy = _ref.strategy;

  var reference = vue.ref();
  var floating = vue.ref();

  var setReference = function setReference(node) {
    if (reference) {
      reference.value = node;
    }
  };

  var setFloating = function setFloating(node) {
    if (floating) {
      floating.value = node;
    }
  };

  var returnData = vue.reactive({
    x: 0,
    y: 0,
    strategy: vue.unref(strategy),
    placement: vue.unref(placement),
    middlewareData: {},
    reference: setReference,
    floating: setFloating
  });

  var update = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('update:start', reference.value, floating.value);

              if (!(!reference.value || !floating.value)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              _context.next = 5;
              return dom.computePosition(reference.value, floating.value, {
                middleware: middleware,
                placement: vue.unref(placement),
                strategy: vue.unref(strategy)
              });

            case 5:
              data = _context.sent;
              console.log(data);
              Object.assign(returnData, data);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function update() {
      return _ref2.apply(this, arguments);
    };
  }();

  vue.watchEffect(update);
  return returnData;
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
