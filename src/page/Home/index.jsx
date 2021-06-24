import _ from 'lodash';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { splitURL } from '../../utils/func';
import CardItem from '../../components/CardItem';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import NoResult from '../../assets/images/pikachu-cry.png';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [fetchUrl, setFetchUrl] = useState('pokemon?limit=30&offset=0');
  const [pokemonList, setPokemonList] = useState();
  const [previousUrl, setPreviousUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [sumPokemon, setSumPokemon] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState();

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
      setSumPokemon(res.data.count);
      setNextUrl(res.data.next === null ? null : splitURL(res.data.next).pop());
      setPreviousUrl(res.data.previous === null ? null : splitURL(res.data.previous).pop());
    })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    return () => cancel();

  }, [fetchUrl]);

  useEffect(() => {
    if (!_.isEmpty(searchQuery)) {
      setLoading(true);
      API.get(`/pokemon/${searchQuery}`)
        .then((res) => {
          console.log(res.data);
          let result = {
            name: _.get(res.data, 'name', 'No Data'),
            imageSprite: _.get(res.data, 'sprites.front_default', 'No Image'),
            imageArtwork: _.get(res.data, 'sprites.other.official-artwork.front_default', 'No Image'),
          }
          setSearchResult(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log('error =>', error);
          setSearchResult('');
          setLoading(false);
        })
    }
  }, [searchQuery])

  const goToNext = () => {
    setFetchUrl(nextUrl);
  }

  const goToPrev = () => {
    setFetchUrl(previousUrl);
  }

  return (
    <div className="container">
      <h1>Pokemon Catalogue App</h1>
      {sumPokemon && <p>There are currently {sumPokemon} pokemon listed here, feel free to browse through the list to see the available pokemon data.</p>}
      <SearchBar
        onChange={_.debounce((e) => setSearchQuery((e.target.value).toLowerCase()), 1000)}
      />
      {!searchQuery && <Pagination
        goToPrevPage={previousUrl ? goToPrev : null}
        goToNextPage={nextUrl ? goToNext : null}
      />}
      {
        loading && <Loading />
      }
      {(!loading && !searchQuery) && <div className="row">
        {
          pokemonList && pokemonList.map((item, i) => {
            return (
              <div className="column-list" key={i}>
                <Link className="pokemon__card--link" to={`/detail/${item.name}`}>
                  <CardItem
                    type="all"
                    data={item}
                  />
                </Link>
              </div>
            )
          })
        }
      </div>}
      {
        (!loading && searchQuery) &&
        <div className="row">
          {searchResult && <div className="column-list">
            <Link className="pokemon__card--link" to={`/detail/${searchResult?.name}`}>
              <CardItem
                type="search"
                data={searchResult}
              />
            </Link>
          </div>
          }
          {
            !searchResult &&
            <div className="pokemon__search-error-container">
              <img alt="" style={{ marginBottom: '0.75rem' }} src={NoResult} width={150}></img>
              <pre>No results found</pre>
            </div>
          }
        </div>
      }
      {!searchQuery && <Pagination
        goToPrevPage={previousUrl ? goToPrev : null}
        goToNextPage={nextUrl ? goToNext : null}
      />}
    </div>
  );
}

export default Home;