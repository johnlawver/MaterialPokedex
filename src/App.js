import { Route, Switch } from "react-router";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />} />
      <Route path="/:pokemonId" render={(props) => <Pokemon {...props} />} />
    </Switch>
  );
};

export default App;
