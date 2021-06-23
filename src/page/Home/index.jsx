import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { splitURL } from '../../utils/func';
import CardItem from '../../components/CardItem';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [fetchUrl, setFetchUrl] = useState('pokemon?limit=30&offset=0');
  const [pokemonList, setPokemonList] = useState();
  const [previousUrl, setPreviousUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    let cancel;
    setLoading(true);
    API.get(fetchUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then((res) => {
      setLoading(false);
      let pokemon = res.data.results.map((item, i) => ({
        name: item.name,
        url: item.url,
        imageSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitURL(item.url)[6]}.png`
      }))
      setPokemonList(pokemon);
      setNextUrl(res.data.next === null ? null : splitURL(res.data.next).pop());
      setPreviousUrl(res.data.previous === null ? null : splitURL(res.data.previous).pop());
    })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    return () => cancel();

  }, [fetchUrl]);

  const goToNext = () => {
    setFetchUrl(nextUrl);
  }

  const goToPrev = () => {
    setFetchUrl(previousUrl);
  }

  return (
    <div className="container">
      <h1>Pokemon Catalogue App</h1>
      <Pagination
        goToPrevPage={previousUrl ? goToPrev : null}
        goToNextPage={nextUrl ? goToNext : null}
      />
      {
        loading && <Loading />
      }
      {!loading && <div className="row">
        {
          pokemonList && pokemonList.map((item, i) => {
            return (
              <div className="column" key={i}>
                <CardItem data={item} />
              </div>
            )
          })
        }
      </div>}
      <Pagination
        goToPrevPage={previousUrl ? goToPrev : null}
        goToNextPage={nextUrl ? goToNext : null}
      />
    </div>
  );
}

export default Home;