import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";

import NavigationBar from "./components/navigation-bar";
import MobileNavigation from "./components/mobile-navigation";
import PokemonList from "./pages/pokemon-list";
import MyPokemon from "./pages/my-pokemon";
import PokemonDetail from "./pages/pokemon-detail";

const CustomContainer = styled.div`
  padding-top: 5rem;
  margin-bottom: 5rem;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
`;

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <CustomContainer>
        <Switch>
          <Route path="/pokemon-detail/:id" component={PokemonDetail} />
          <Route path="/my-pokemon" component={MyPokemon} />
          <Route exact path="/" component={PokemonList} />
        </Switch>
      </CustomContainer>
      <MobileNavigation />
    </Router>
  );
}
