import React, { Component } from "react";
import PokeObject from "pokemon-metadata";
import { Input, Page, Header, Flex } from "@procore/core-react";

import "./App.css";
import Sidebar from "./components/Sidebar";
import PokeCard from "./components/PokeCard";
import { turnObjectIntoArray } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      pokemonArray: turnObjectIntoArray(PokeObject),
      sideParty: []
    };
  }

  addToSideParty = (pokemonName) => {
    return () => {
        console.log("inner function invoked with", pokemonName)
        this.state.sideParty.push(pokemonName)
        this.setState({ sideParty: this.state.sideParty })
    }
  }

  removeFromSideParty = (pokemonName) => {
    return () => {
      const reducedSideParty = this.state.sideParty
      .filter(name => {
        return name !== pokemonName;
      })
      this.setState({ sideParty: reducedSideParty })
    }
  }

  render() {
    const { pokemonArray, searchTerm, sideParty } = this.state;

    console.log(sideParty)
    return (
      <Page>
        <Page.Main>
          <Page.ToolHeader>
            <Header.H1>Choose your Pokemon</Header.H1>
          </Page.ToolHeader>
          <Page.Filters>
            <Header type="h2">Search by Name</Header>
            <Input
              onChange={event => {
                const payload = {
                  searchTerm: event.target.value
                };

                this.setState(payload);
              }}
            />
          </Page.Filters>
          <Page.Body>
            <Flex wrap="wrap">
              {pokemonArray
                .filter(poke => {
                  return (
                    poke.name.includes(searchTerm)
                  );
                })
                .map(poke => {
                  return (
                    <PokeCard
                      key={poke.name}
                      pokemon={poke}
                      clickIcon={this.addToSideParty}
                      enabled={!this.state.sideParty.includes(poke.name)}
                    />
                  );
                })}
            </Flex>
          </Page.Body>
        </Page.Main>
        <Sidebar
        pokemonArray={pokemonArray
          .filter(poke => {
            return (
              sideParty.includes(poke.name)
            );
          })
        }
        removeFromSideParty={this.removeFromSideParty}
        />
      </Page>
    );
  }
}

export default App;
