import React from 'react';
import './style.css';


// eslint-disable-next-line object-curly-newline
const TourItem = ({ id, name, price, img }) => <>
    <div className = "tour-item" data-id = {id}>
        <img src = { img } alt = "icon"/>
        <i className = "far fa-heart item-heart" data-id = {id}></i>
        <h5 className = "tour-title">{ name }</h5>
        <h4 className = "tour-price">{ price }$</h4>
    </div>
    </>;


export default TourItem;
