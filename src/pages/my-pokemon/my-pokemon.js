import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { allStorage } from '../../services/pokemon-localStorage/pokemon-localStorage';
import test from '../../assets/images/profile.jpg';
import '../../css/my-pokemon.css';

const CustomLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #ffffff;
  }
`;

const CustomText = styled.p`
  padding: 10px;
  text-align: center;
`;

export default function MyPokemon() {
  const myPokemons = allStorage();
  return (
    <React.Fragment>
      <div className='user'>
        <div className='user__header'>
          <h2 className='detail__headerTitle'>My Profile</h2>
          <span className=''>
            The information about Pokemon trainer and manage your Pokemon.
          </span>
        </div>
        <div className='user__profile'>
          <img src={test} alt='profile' className='user__avatar' />
          <p>Pokemon Trainer</p>
        </div>
        <h3 className='user__pokemonTitle'>My Pokemon List</h3>
        {myPokemons.length !== 0 ? (
          <div className='user__row'>
            {myPokemons.map((myPokemon, key) => {
              return (
                <div key={key} className='user__column'>
                  <img
                    className='user__pokemonImage'
                    src={myPokemon.image_url}
                    alt='pokemon'
                    data-testid='pokemonImage'
                  />
                  <p className='user__pokemonNick'>{myPokemon.nickname}</p>
                  <button
                    className='user__button'
                    data-testid='removeButton'
                    onClick={() => {
                      localStorage.removeItem(myPokemon.nickname);
                    }}
                  >
                    <CustomLink to='/my-pokemon'>Release</CustomLink>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <CustomText>
            You don't have a Pokemon. Try catch a Pokemon by tap/click the
            pokemon on Pokemon List Page
          </CustomText>
        )}
      </div>
    </React.Fragment>
  );
}
