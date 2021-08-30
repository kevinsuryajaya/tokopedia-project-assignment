import * as React from 'react';
import { getAllPokemon } from '../../services/pokemon-data/pokemon-data';
import CustomCard from '../../components/custom-card/custom-card';
import '../../css/pokemon-list.css';


export default function PokemonList() {
  const [pokemonData, setPokemonData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [counter, setCounter] = React.useState(10);
  
  React.useEffect(() => {
    (async () => {
      let res = await getAllPokemon(counter);
      setPokemonData(res.data.pokemons.results)
      setLoading(false)
    })()
  }, [counter]);

  const handleClick = async () => {
    setCounter(counter + 10);
    let res = await getAllPokemon(counter);
    setPokemonData(res.data.pokemons.results);
  };

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <div className="home">
          <h2 className="home__title">Pokemon List</h2>
          <div className="home__section">
            {pokemonData.map((pokemon, key) => {
              return <CustomCard key={key} pokemon={pokemon} />;
            })}
          </div>
          <button className="home__button" onClick={handleClick}>
            Load More
          </button>
        </div>
      )}
    </React.Fragment>
  );
}
