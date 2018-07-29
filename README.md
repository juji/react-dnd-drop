# react-dnd-drop

It's a drag and drop react component with designated drop area(s).

It enables you to place an item on a drop-area. It works with the DOM.

This is not a sort. It's a fancy multiple-selection thingy.

[Example](http://juji.github.io/react-dnd-drop/)

## Install
```
yarn add react-dnd-drop
# npm install react-dnd-drop --save
```

## Usage
```jsx

import DnD from 'react-dnd-drop';

// hypotethical items
items = [
  { id: 0, text: 'item 1'},
  { id: 1, text: 'item 2'},
]

// handle drop
handleDrop = ( dropAreas, item ) => {

  /**
  * dropAreas = [ 0 ]  // index of dropAreas
  * item
  */
  console.log( dropareas, item )

}

// add ref to your drop area
<div ref={ref => this.dropArea = ref}></div>

// items to drag
<div>{items.map(item => (
  <DnD
    getDropAreas={() => [this.dropArea]}
    onDrop={dropAreas => this.handleDrop(dropAreas, item)}
  ><div>{item.text}</div></DnD>
))}</div>

```

## DnD Properties
| Name | Default | Desc |
|---|---|---|
| getDropAreas | null | `Function`, should return an array of drop areas |
| onDrop | null | `Function`, will be executed when an item is dropped within a dropArea'a bound |
| overlayStyle | object | `Object`, a custom styling for overlay. overaly is used to track mouse movement |
| copyStyle | object | `Object`, a custom styling for item's copy: The one we are dragging on mouseDown |

## How it works
Every item gets a copy, which style can be overriden with `copyStyle`, it will be overriden like this:
```js
{
  opacity:0.8,
  position:'fixed',
  zIndex:'3001',
  cursor:'grabbing',
  ...(copyStyle || {}),
  display: dragging ? 'inline-block' : 'none',
  width, height, top, left
}
```

on `mouseDown`, mouse movement (or touch) gets tracked by the overlay, which style can be ovverriden with `overlayStyle`:
```js
{
  backgroundColor:'transparent',
  position:'fixed',
  top:0,
  left:0,
  width:'100%',
  height:'100%',
  zIndex:'3000',
  cursor:'grabbing',
  ...(overlayStyle || {}),
  display: dragging ? 'block' : 'none'
}
```

on `mouseUp`, intersections will calculated between the copy and the dropAreas. If there is an intersection,
`onDrop` will be executed:
```
onDrop( indexes_of_intersected_dropareas )
```


...

Cheers,

[jujiyangasli.com](http://jujiyangasli.com)
