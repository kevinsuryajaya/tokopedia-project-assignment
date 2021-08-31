
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  const renderApp = async () => act(async () => render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ));

  it('should display pokemon list', async () => {
    renderApp();

    const pokemonListText = screen.getAllByText(/Pokemon List/i);
    const searchPokemonText = screen.getByPlaceholderText(/Find Pokemon/i);
    const pokemonTitleText = screen.getByText(/Pokemon Project/i);

    expect(pokemonListText).toBeDefined();
    expect(searchPokemonText).toBeDefined();
    expect(pokemonTitleText).toBeDefined();
  });
});
