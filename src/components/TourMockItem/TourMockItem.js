import React, { Component } from 'react';
import './style.css';

// in order to map can iterate array
const arr = new Array(8);
arr.fill(1);

// eslint-disable-next-line object-curly-newline
const TourMockItem = () => (
  <>
  {arr.map((el, index) => <div className = "mock tour-item" key={index} >
    <div></div>
    <div className = 'sub'></div>
  </div>)}
</>
);


export default TourMockItem;
