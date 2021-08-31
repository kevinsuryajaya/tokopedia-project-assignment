import * as React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../../services/global-gql/global-gql';
import '../../css/pokemon-detail.css';

export default function PokemonDetail(props) {
  const [toggle, setToggle] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [key, setKey] = React.useState('');
  const [store, setStore] = React.useState({
    nickname: '',
    pokemon: '',
    image_url: '',
  });
  const gqlVariables = {
    name: props.match.params.id,
  };

  const {
    loading,
    error,
    data: pokemonData,
  } = useQuery(GET_POKEMON, {
    variables: gqlVariables,
  });

  const catchClick = () => {
    const min = 1;
    const max = 3;
    const random = Math.floor(min + Math.random() * (max - min));
    if (random === 1) {
      alert('Pokemon Escape!');
    } else {
      setToggle(!toggle);
    }
  };

  const handleChange = (event) => {
    setKey(event.target.value);
    setStore({
      ...store,
      pokemon: pokemonData.pokemon.name,
      nickname: event.target.value,
      image_url: pokemonData.pokemon.sprites.front_default,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.localStorage.getItem(key) === null) {
      window.localStorage.setItem(key, JSON.stringify(store));
      setToggle(false);
    } else if (window.localStorage.getItem(key) !== null) {
      setCheck(true);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <div className='detail'>
          <div className='detail__header'>
            <h2 className='detail__headerTitle'>Pokemon Detail</h2>
            <span>The information about pokemon type, ability, and move</span>
          </div>
          {error ? (
            <p>{error.message}</p>
          ) : (
            <>
              <div className='detail__body'>
                <div className='detail__contentSection detail__contentSection--margin'>
                  <div>
                    <img
                      className='detail__image'
                      src={pokemonData.pokemon.sprites.front_default}
                      alt='pokemon'
                      data-testid='pokemonImage'
                    />
                  </div>
                  <div>
                    <button
                      className='detail__button'
                      onClick={catchClick}
                      data-testid='catchButton'
                    >
                      Catch With Your Poke Ball!
                    </button>
                  </div>
                </div>
                <div id={toggle === true ? 'open' : ''} className='modal'>
                  <form onSubmit={handleSubmit}>
                    <div className='modal__content'>
                      <div className='modal__header'>
                        <h2>You Catch a Pokemon!</h2>
                      </div>
                      <div className='modal__body'>
                        <p>Give a Pokemon Nickname:</p>
                        <input
                          className='modal__input'
                          type='text'
                          name='nickname'
                          placeholder='Your Pokemon Nickname...'
                          value={key}
                          onChange={handleChange}
                          required
                          data-testid='nicknameInput'
                        />
                      </div>
                      {check ? (
                        <p className='modal__check'>Nickname already exist</p>
                      ) : (
                        ''
                      )}
                      <div className='modal__footer'>
                        <button type='submit' className='modal__button'>
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className='detail__contentSection'>
                  <div className='detail__content'>
                    <h4 className='detail__contentTitle'>Name</h4>
                    <span className='detail__name'>
                      {pokemonData.pokemon.name}
                    </span>
                  </div>
                  <div className='detail__content'>
                    <h4 className='detail__contentTitle'>Type</h4>{' '}
                    {pokemonData.pokemon.types.map((type, key) => {
                      return (
                        <span
                          className='detail__desc detail__desc--type'
                          key={key}
                        >
                          {type.type.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className='detail__content'>
                    <h4 className='detail__contentTitle'>Ability</h4>{' '}
                    {pokemonData.pokemon.abilities.map((ability, key) => {
                      return (
                        <span
                          className='detail__desc detail__desc--ability'
                          key={key}
                        >
                          {ability.ability.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='detail__content detail__content--center'>
                <h3 className='detail__contentTitle detail__contentTitle--center'>
                  Pokemon Move List
                </h3>
                <div className='detail__row'>
                  {pokemonData.pokemon.moves.map((move, key) => {
                    return (
                      <span
                        className='detail__desc detail__desc--move'
                        key={key}
                      >
                        {move.move.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
