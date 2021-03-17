import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { firstCharUppercase } from "./constants";
import axios from "axios";

const useStyles = makeStyles({
  pokedexContianer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    paddingRight: "20px",
    marginTop: "10px",
    marginBottom: "5px",
  },
});

const Pokedex = (props) => {
  const { history } = props;
  const {
    pokedexContianer,
    cardMedia,
    cardContent,
    searchContainer,
  } = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonID) => {
    const { name, sprite, id } = pokemonData[pokemonID];
    return (
      <Grid item xs={12} sm={4} lg={3} key={id}>
        <Card
          onClick={() => {
            history.push(`/${id}`);
          }}
        >
          <CardMedia
            className={cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={cardContent}>{`${id}. ${firstCharUppercase(
            name
          )}`}</CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div>
            <TextField
              onChange={handleSearchChange}
              className={searchContainer}
              label="Pokemon"
              variant="outlined"
              color="secondary"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={pokedexContianer}>
          {Object.keys(pokemonData).map(
            (pokemonID) =>
              pokemonData[pokemonID].name.includes(filter) &&
              getPokemonCard(pokemonID)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
