import { Button, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { firstCharUppercase } from "./constants";
import axios from "axios";

const Pokemon = (props) => {
  const {
    history,
    match: {
      params: { pokemonId },
    },
  } = props;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const {
      name,
      id,
      species,
      height,
      weight,
      types,
      sprites: { front_default },
    } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    return (
      <>
        <Typography variant="h1">
          {`${id}. ${firstCharUppercase(name)}`}
          <img src={front_default} alt={name} />
        </Typography>
        <img src={fullImageUrl} alt={name} height="300px" />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>{`Species: ${species.name}`}</Typography>
        <Typography>{`Height: ${height}`}</Typography>
        <Typography>{`Weight: ${weight}`}</Typography>
        <Typography variant="h5">{"Types:"}</Typography>
        {types.map((typeInfo) => {
          const {
            type: { name },
          } = typeInfo;
          return <Typography key={name}> {`${name}`}</Typography>;
        })}
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/")}
        >
          back to pokedex
        </Button>
      )}
    </>
  );
};

export default Pokemon;
