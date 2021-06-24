import { splitURL } from '../utils/func';

export default function CardItem({ type = 'all', data }) {
  function addFallbackImg(ev) {
    ev.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${splitURL(data.url)[6]}.png`
  }

  let content;

  if (type === 'all') {
    content = <div className="pokemon__card">
      <img className="pokemon__card--img" src={data.imageSprite} onError={addFallbackImg} alt=""></img>
      <p className="pokemon__card--name">{data.name}</p>
    </div>
  }

  if (type === 'search') {
    content = <div className="pokemon__card">
      <img className="pokemon__card--img" src={data?.imageSprite ? data?.imageSprite : data?.imageArtwork} alt=""></img>
      <p className="pokemon__card--name">{data?.name}</p>
    </div>
  }

  return (
    <>
      {content}
    </>
  )
}