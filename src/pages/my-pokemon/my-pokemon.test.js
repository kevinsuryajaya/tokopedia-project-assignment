import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyPokemon from './my-pokemon';

jest.spyOn(window.localStorage.__proto__, 'removeItem');
window.localStorage.__proto__.removeItem = jest.fn();

describe('MyPokemon', () => {
    const jsonData = "{\"nickname\":\"name\",\"pokemon\":\"venusaur\",\"image_url\":\"url\"}";
     const pokemon = {
            nickname: "name",
            pokemon: "venusaur",
            image_url: "url"
        };

    beforeEach(() => {
        localStorage.setItem('name', jsonData);
        render(
            <Router>
                <MyPokemon />
            </Router>
        );
    });

    afterEach(() => {
        localStorage.removeItem('name');
    });

    describe('#render', () => {
        it('should display pokemon trainer profile texts', () => {
            const profileTitleText = screen.getByText('My Profile');
            const profileSubtitleText = screen.getByText('The information about Pokemon trainer and manage your Pokemon.');
            const pokemonTrainerText = screen.getByText('Pokemon Trainer');
            const pokemonListText = screen.getByText('My Pokemon List');

            expect(profileTitleText).toBeInTheDocument();
            expect(profileSubtitleText).toBeInTheDocument();
            expect(pokemonTrainerText).toBeInTheDocument();
            expect(pokemonListText).toBeInTheDocument();
        });

        it('should display pokemon trainer profile data', () => {
            const pokemonImage = screen.getByTestId('pokemonImage');
            const pokemonName = screen.getByText('name');
            const releaseButton = screen.getByTestId('removeButton');
           
            expect(pokemonImage).toBeInTheDocument();
            expect(pokemonName).toBeInTheDocument();
            expect(releaseButton).toBeInTheDocument();
        });
    });

    describe('#onPress', () => {
        it('should call localStorage removeItem with expected param when remove button clicked', async () => {
            const releaseButton = screen.getByTestId('removeButton');

            await act(async () => userEvent.click(releaseButton));

            expect(localStorage.removeItem).toBeCalledWith(pokemon.nickname);
        });
    });
});