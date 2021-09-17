import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Typography,
  Paper,
  Container,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: 240,
  },
  div: {
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: 60,
    marginLeft: 30,
    marginRight: "auto",
  },
  footer: {
    bottom: 0,
    position: "fixed",
    width: "100%",
  },
  container: {
    marginTop: theme.spacing(15),
  },
  card: {
    maxWidth: 350,
    background: "linear-gradient(45deg, #AE64F3 20%, #0C00FF 90%)",
  },
  imagePoke: {
    height: 250,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const state = useParams();
  const history = useHistory();
  const [pokemon, setPokemon] = useState([]);

  

  const loadData = () => {
    setPokemon([])
    console.log(state, Object.entries(props));
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${
          (state.page - 1) * 10
        }`
      )
      .then((resp) => {
        for (let i = 0; i < resp.data.results.length; i++) {
          axios.get(resp.data.results[i].url).then((result) => {
            setPokemon((prevArray) => [...prevArray, result.data]);
          });
        }
      });
  };

  useEffect(loadData, [state]);

  return (
    <>
      <CssBaseline />

      <Container
        maxWidth="lg"
        component={Paper}
        elevattion={4}
        className={classes.container}
      >
        <div>
          <Link to={`/${parseInt(state.page,10) + 1}`}>Next</Link>
        </div>
        <Grid container spacing={2}>
          {pokemon.map((poke, index) => (
            <Grid key={index} item xs={6} sm={2}>
              <Card className={classes.card} raised={true}>
                <CardActionArea>
                  <CardContent>
                    <CardMedia
                      image={poke.sprites.front_default}
                      className={classes.imagePoke}
                    />
                    <Typography align="center" variant="h4">
                      {poke.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Layout;
