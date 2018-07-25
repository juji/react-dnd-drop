function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import boxIntersect from 'box-intersect';
import ReactDOM from 'react-dom';
export default class DnD extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onMouseDown", e => {
      e.preventDefault();
      const {
        top,
        left,
        width,
        height
      } = ReactDOM.findDOMNode(this.elm).getBoundingClientRect();
      this.setState({
        top,
        left,
        width,
        height,
        dragging: true,
        deltaLeft: e.clientX - left,
        deltaTop: e.clientY - top
      });
    });

    _defineProperty(this, "onMouseMove", e => {
      if (!this.state.dragging) return;
      this.setState({
        top: e.clientY - this.state.deltaTop,
        left: e.clientX - this.state.deltaLeft
      });
    });

    _defineProperty(this, "onMouseUp", () => {
      if (!this.state.dragging) return;
      this.setState({
        dragging: false
      });

      this._intersect();
    });

    _defineProperty(this, "_intersect", () => {
      // check for null dropArea
      const dropAreas = this.props.getDropAreas();
      const nullVal = dropAreas.filter(v => !v);
      if (nullVal.length) throw new Error('REACT-DND-DROP: dropArea Element cannot be empty');
      const bound = ReactDOM.findDOMNode(this.copy).getBoundingClientRect();
      const copy = [bound.left, bound.top, bound.right, bound.bottom]; // calc intersect

      const overlaps = dropAreas.map((v, i) => {
        const b = ReactDOM.findDOMNode(v).getBoundingClientRect();
        return boxIntersect([[b.left, b.top, b.right, b.bottom], copy]).length ? i : null;
      }).filter(v => v !== null);
      if (overlaps.length && overlaps) this.props.onDrop(overlaps);
    });

    this.state = {
      dragging: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      deltaTop: 0,
      deltaLeft: 0
    };
    this.copy = null;
    this.elm = null;
  }

  render() {
    const {
      dragging,
      width,
      height,
      top,
      left
    } = this.state;
    const {
      overlayStyle,
      copyStyle
    } = this.props;

    const overlay = _objectSpread({
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

    const copy = _objectSpread({
      opacity: 0.8,
      position: 'fixed',
      zIndex: '3001',
      cursor: 'grabbing'
    }, copyStyle || {}, {
      display: dragging ? 'inline-block' : 'none',
      width,
      height,
      top,
      left
    });

    return React.createElement("div", {
      ref: r => this.elm = r,
      onMouseDown: this.onMouseDown,
      onTouchStart: this.onMouseDown
    }, this.props.children, React.createElement("div", {
      onMouseMove: dragging ? this.onMouseMove : null,
      onTouchMove: dragging ? this.onMouseMove : null,
      onMouseUp: dragging ? this.onMouseUp : null,
      onTouchEnd: dragging ? this.onMouseUp : null,
      style: overlay
    }, React.createElement("div", {
      ref: r => this.copy = r,
      style: copy
    }, this.props.children)));
  }

}
//# sourceMappingURL=index.js.map