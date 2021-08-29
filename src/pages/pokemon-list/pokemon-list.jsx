import * as React from 'react';
import { GET_ALL_POKEMONS } from '../../services/global-gql/global-gql';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import CustomCard from '../../components/custom-card/custom-card';
import '../../css/pokemon-list.css';


export default function PokemonList() {
  const [counter, setCounter] = React.useState(0);

  const gqlVariables = {
    limit: 10,
    offset: counter,
  };

  const { loading, error, data } = useQuery(GET_ALL_POKEMONS, {
    variables: gqlVariables
  })

  const pokemonsData = get(data, 'pokemons.results', []);

  const handleClickNext = () => {
    setCounter(counter + 10);
  };

  const handleClickPrev = () => {
    setCounter(counter - 10);
  };

  return (
    <React.Fragment>
      {loading ? (<h1>Loading..</h1>) : (
        <div className='home'>
          <h2 className='home__title'>Pokemon List</h2>
          {error ? (<h2>{error.message}</h2>) : (
            <div className='home__section'>
              {pokemonsData.map((pokemon, key) => {
                return <CustomCard key={key} pokemon={pokemon} />;
              })}
            </div>
          )}
          {counter < 10 ? (null) : (
            <button className='home__button' onClick={handleClickPrev}>
              prev
            </button>
          )}
          <button className='home__button' onClick={handleClickNext}>
            next
          </button>
        </div>
      )}


    </React.Fragment>
  );
}
