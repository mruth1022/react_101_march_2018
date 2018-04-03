import React from "react";
import { Flex, Page } from "@procore/core-react";
import PokeCard from "./PokeCard"

const Sidebar = ({pokemonArray, removeFromSideParty}) => (
  <Page.Sidebar>
    <Flex wrap="wrap">
      {pokemonArray
        .map(poke => {
          return (
            <PokeCard
              key={poke.name}
              pokemon={poke}
              clickIcon={removeFromSideParty}
              enabled={true}
            />
          );
        })}
    </Flex>
  </Page.Sidebar>
);

export default Sidebar;
