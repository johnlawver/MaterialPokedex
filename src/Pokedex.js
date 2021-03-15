import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mockData from "./mockData";

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
});

const firstCharUppercase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

const Pokedex = (props) => {
  const { history } = props;
  const { pokedexContianer, cardMedia, cardContent } = useStyles();
  const [pokemonData, setPokemonData] = useState(mockData);

  const getPokemonCard = (pokemonID) => {
    console.log(pokemonData[`${pokemonID}`]);
    const { name, sprites, id } = pokemonData[`${pokemonID}`];
    return (
      <Grid item xs={12} sm={4} key={pokemonID}>
        <Card
          onClick={() => {
            history.push(`/${pokemonID}`);
          }}
        >
          <CardMedia
            className={cardMedia}
            image={sprites.front_default}
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
        <Toolbar>This is for sure a nav bar</Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={pokedexContianer}>
          {Object.keys(pokemonData).map((pokemonID) =>
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
