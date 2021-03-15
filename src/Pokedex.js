import { AppBar, Toolbar, Grid, Card, CardContent } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pokedexContianer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
});

const getPokemonCard = (info) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>{info}</CardContent>
      </Card>
    </Grid>
  );
};

const Pokedex = () => {
  const { pokedexContianer } = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>This is for sure a nav bar</Toolbar>
      </AppBar>
      <Grid container spacing={2} className={pokedexContianer}>
        {getPokemonCard("Card 1")}
        {getPokemonCard("Card 2")}
        {getPokemonCard("Card 3")}
        {getPokemonCard("Weird Fish")}
      </Grid>
    </>
  );
};

export default Pokedex;
