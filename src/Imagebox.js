import React from 'react';
import './App.scss';

const Imagebox = (props) =>
            <div>
               <img src={(props.url)}   alt={props.tags}  />
               <h2 >{props.tags} </h2>
            </div>
      ;


export default Imagebox;
