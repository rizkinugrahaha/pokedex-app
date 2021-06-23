import React from 'react';
import gif from '../assets/images/pikachu-run.gif';

export default function Loading() {
  return (
    <div className="pokemon__loading-container">
      <img className="pokemon__loading--img" src={gif} alt=""></img>
      <pre>Loading...</pre>
    </div>
  )
}