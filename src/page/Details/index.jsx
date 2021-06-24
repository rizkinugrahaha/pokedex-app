import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import Loading from "../../components/Loading";

export default function Details() {
  const params = useParams();
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/pokemon/${params.name}`)
      .then((res) => {
        setPokemonData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    return () => {
      setPokemonData({});
      setLoading(true);
    }
  }, []);

  return (
    <div className="container">
      {
        loading && <Loading />
      }

      {pokemonData &&
        <div className="row justify-center">
          <div className="column-full">
            <h1 className="capitalize">{_.get(pokemonData, 'name', 'No Data')}</h1>
            <div className="pokemon__detail--img-container">
              <img
                className="pokemon__detail--img"
                alt=""
                src={pokemonData?.sprites?.other['official-artwork']?.front_default ? pokemonData?.sprites?.other['official-artwork']?.front_default : pokemonData?.sprites?.front_default}>
              </img>
            </div>
            <div className="d-flex">
              <div className="pokemon__detail--img-container spacing-right">
                <img
                  className="pokemon__detail--img-sm"
                  alt=""
                  src={pokemonData?.sprites?.front_default}>
                </img>
              </div>
              <div className="pokemon__detail--img-container">
                <img
                  className="pokemon__detail--img-sm"
                  alt=""
                  src={pokemonData?.sprites?.back_default}>
                </img>
              </div>
            </div>
            <div className="table__wrapper">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Base Experience</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{_.get(pokemonData, 'base_experience', 'No Data')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table__wrapper">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {
                        pokemonData?.types?.map((item, i) => {
                          return (
                            <React.Fragment key={i}>
                              <span className={`pokemon__type-span type--${item.type.name}`}>{item.type.name}</span>
                            </React.Fragment>
                          )
                        })
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table__wrapper">
              <table>
                <thead>
                  <tr>
                    <th colSpan="6">Stats</th>
                  </tr>
                  <tr className="stat-column">
                    <th>HP</th>
                    <th>ATK</th>
                    <th>DEF</th>
                    <th>Sp. ATK</th>
                    <th>Sp. DEF</th>
                    <th>SPD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="stat-column">
                    {
                      pokemonData?.stats?.map((item, i) => {
                        return (
                          <td key={i}>
                            {item.base_stat}
                          </td>
                        )
                      })
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  )
}