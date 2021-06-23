import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import Loading from "../../components/Loading";

export default function Details() {
  const params = useParams();
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/pokemon/${params.name}`)
      .then((res) => {
        console.log(res.data);
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
        <h1 className="capitalize">{pokemonData.name}</h1>
      }
    </div>
  )
}