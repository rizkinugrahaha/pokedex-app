import React from 'react';
import { splitURL } from '../utils/func';

export default function CardItem({ data }) {
  function addFallbackImg(ev) {
    ev.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${splitURL(data.url)[6]}.png`
  }

  return (
    <div className="pokemon__card">
      <img className="pokemon__card--img" src={data.imageSprite} onError={addFallbackImg}></img>
      <p className="pokemon__card--name">{data.name}</p>
    </div>
  )
}