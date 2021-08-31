import { render, screen } from '@testing-library/react';
import React from 'react';
import { useQuery } from '@apollo/client';

import PokemonDetail from './pokemon-detail';

jest.mock('@apollo/client');

describe('PokemonDetail', () => {
    const props = {
        match: {
            params: { id: 'id' }
        }
    };
    const pokemonData = {
        pokemon: {
            name: 'name',
            sprites: { front_default: 'url' },
            types: [{ type: { name: 'grass' } }],
            abilities: [{ ability: { name: 'grow' } }],
            moves: [{ move: { name: 'grass-knot' } }]
        }
    };
    const gqlData = {
        loading: false,
        error: null,
        data: pokemonData
    };

    beforeEach(() => {
        useQuery.mockReturnValue(gqlData);
        render(
            <PokemonDetail {...props} />
        );
    });

    describe('#render', () => {
        it('should render pokemon detail texts correctly', () => {
            const pokemonDetailText = screen.getByText('Pokemon Detail');
            const pokemonDetailSubtitle = screen.getByText('The information about pokemon type, ability, and move');
            const pokemonNameText = screen.getByText('Name');
            const pokemonAbilityText = screen.getByText('Ability');
            const pokemonTypeText = screen.getByText('Type');

            expect(pokemonDetailText).toBeInTheDocument();
            expect(pokemonDetailSubtitle).toBeInTheDocument();
            expect(pokemonNameText).toBeInTheDocument();
            expect(pokemonAbilityText).toBeInTheDocument();
            expect(pokemonTypeText).toBeInTheDocument();
        });

        it('should render pokemon detail data correctly', () => {
            const pokemonNameText = screen.getByText('name');
            const pokemonTypeText = screen.getByText('grass');
            const pokemonAbilityText = screen.getByText('grow');
            const pokemonMoveText = screen.getByText('grass-knot');
            const pokemonImage = screen.getByTestId('pokemonImage')

            expect(pokemonNameText).toBeInTheDocument();
            expect(pokemonTypeText).toBeInTheDocument();
            expect(pokemonAbilityText).toBeInTheDocument();
            expect(pokemonMoveText).toBeInTheDocument();
            expect(pokemonImage).toBeInTheDocument();
        });

        it('should render loading text when loading is true', () => {
            const gqlDataWithLoading = { ...gqlData, loading: true };
            useQuery.mockReturnValue(gqlDataWithLoading);
            render(
                <PokemonDetail {...props} />
            );
            const loadingText = screen.getByText('Loading..');

            expect(loadingText).toBeInTheDocument();
        });

        it('should render error text when error exists', () => {
            const gqlDataWithError = { ...gqlData, error: { message: 'error' } };
            useQuery.mockReturnValue(gqlDataWithError);
            render(
                <PokemonDetail {...props} />
            );
            const errorText = screen.getByText('error');

            expect(errorText).toBeInTheDocument();
        });
    });
});