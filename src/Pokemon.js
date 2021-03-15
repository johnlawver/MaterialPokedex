import React from "react";

const Pokemon = (props) => {
  const {
    match: {
      params: { pokemonId },
    },
  } = props;
  return <div>This is the Pokemon Page for pokemon {pokemonId}</div>;
};

export default Pokemon;
