"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _boxIntersect = _interopRequireDefault(require("box-intersect"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DnD =
/*#__PURE__*/
function (_Component) {
  _inherits(DnD, _Component);

  function DnD(props) {
    var _this;

    _classCallCheck(this, DnD);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DnD).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseDown", function (e) {
      console.log('onMouseDown');

      try {
        e.preventDefault();
      } catch (e) {}

      var _ReactDOM$findDOMNode = _reactDom.default.findDOMNode(_this.elm).getBoundingClientRect(),
          top = _ReactDOM$findDOMNode.top,
          left = _ReactDOM$findDOMNode.left,
          width = _ReactDOM$findDOMNode.width,
          height = _ReactDOM$findDOMNode.height;

      _this.setState({
        top: top,
        left: left,
        width: width,
        height: height,
        dragging: true,
        deltaLeft: (e.touches && _typeof(e.touches[0].clientX) !== undefined ? e.touches[0].clientX : e.clientX) - left,
        deltaTop: (e.touches && _typeof(e.touches[0].clientY) !== undefined ? e.touches[0].clientY : e.clientX) - top
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseMove", function (e) {
      console.log('onMouseMove');
      if (!_this.state.dragging) return;

      _this.setState({
        left: (e.touches && _typeof(e.touches[0].clientX) !== undefined ? e.touches[0].clientX : e.clientX) - _this.state.deltaLeft,
        top: (e.touches && _typeof(e.touches[0].clientY) !== undefined ? e.touches[0].clientY : e.clientX) - _this.state.deltaTop
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseUp", function () {
      if (!_this.state.dragging) return;

      _this.setState({
        dragging: false
      });

      _this._intersect();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_intersect", function () {
      // check for null dropArea
      var dropAreas = _this.props.getDropAreas();

      var nullVal = dropAreas.filter(function (v) {
        return !v;
      });
      if (nullVal.length) throw new Error('REACT-DND-DROP: dropArea Element cannot be empty');

      var bound = _reactDom.default.findDOMNode(_this.copy).getBoundingClientRect();

      var copy = [bound.left, bound.top, bound.right, bound.bottom]; // calc intersect

      var overlaps = dropAreas.map(function (v, i) {
        var b = _reactDom.default.findDOMNode(v).getBoundingClientRect();

        return (0, _boxIntersect.default)([[b.left, b.top, b.right, b.bottom], copy]).length ? i : null;
      }).filter(function (v) {
        return v !== null;
      });
      if (overlaps.length && overlaps) _this.props.onDrop(overlaps);
    });

    _this.state = {
      dragging: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      deltaTop: 0,
      deltaLeft: 0
    };
    _this.copy = null;
    _this.elm = null;
    return _this;
  }

  _createClass(DnD, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          dragging = _this$state.dragging,
          width = _this$state.width,
          height = _this$state.height,
          top = _this$state.top,
          left = _this$state.left;
      var _this$props = this.props,
          overlayStyle = _this$props.overlayStyle,
          copyStyle = _this$props.copyStyle;

      var overlay = _objectSpread({
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '3000',
        cursor: 'grabbing'
      }, overlayStyle || {}, {
        display: dragging ? 'block' : 'none'
      });

      var copy = _objectSpread({
        opacity: 0.8,
        position: 'fixed',
        zIndex: '3001',
        cursor: 'grabbing'
      }, copyStyle || {}, {
        display: dragging ? 'inline-block' : 'none',
        width: width,
        height: height,
        top: top,
        left: left
      });

      return _react.default.createElement("div", {
        ref: function ref(r) {
          return _this2.elm = r;
        },
        onMouseDown: this.onMouseDown,
        onTouchStart: this.onMouseDown,
        onTouchMove: dragging ? this.onMouseMove : null,
        onTouchEnd: dragging ? this.onMouseUp : null
      }, this.props.children, _react.default.createElement("div", {
        onMouseMove: dragging ? this.onMouseMove : null,
        onMouseUp: dragging ? this.onMouseUp : null,
        style: overlay
      }, _react.default.createElement("div", {
        ref: function ref(r) {
          return _this2.copy = r;
        },
        style: copy
      }, this.props.children)));
    }
  }]);

  return DnD;
}(_react.Component);

exports.default = DnD;
//# sourceMappingURL=index.js.map