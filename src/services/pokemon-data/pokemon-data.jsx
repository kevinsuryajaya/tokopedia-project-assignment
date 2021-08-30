import { GET_ALL_POKEMONS } from '../global-gql/global-gql';

export async function getAllPokemon(limit) {
  const gqlVariables = {
    limit: limit,
    offset: 0
  };
  let result = await fetch('https://graphql-pokeapi.graphcdn.app/', {
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ALL_POKEMONS,
      variables: gqlVariables,
    }),
    method: 'POST',
  })
  let pokeData = await result.json();

  return pokeData
}
