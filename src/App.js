import { useEffect, useState } from 'react';
import './App.css';
import { splitURL } from './utils/func';
import API from './services/api';

function App() {
  const [offset, setOffset] = useState(900);
  const [pokemonList, setPokemonList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      API.get(`/pokemon?limit=20&offset=${offset}`)
        .then((res) => {
          let pokemon = res.data.results.map((item, i) => ({
            name: item.name,
            url: item.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitURL(item.url)[6]}.png`
          }))
          setPokemonList(pokemon);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {
        pokemonList && pokemonList.map((item, i) => {
          return (
            <li key={i}>
              {item.name}
              <img src={item.image}></img>
            </li>
          )
        })
      }
    </div>
  );
}

export default App;
