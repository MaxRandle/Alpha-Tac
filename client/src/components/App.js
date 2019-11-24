import React, { useState, useContext } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Board from "./Board";
import { BoardStateContext } from "../contexts/BoardStateContext";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    textAlign: "center"
  },
  block: {
    paddingBottom: theme.spacing(4)
  }
}));

const App = () => {
  const classes = useStyles();
  const [boardState, setBoardState] = useContext(BoardStateContext);

  const resetBoard = () => {
    setBoardState({
      boardArray: new Array(9).fill(new Array(9).fill(null)).map(x => x.slice(0)),
      victoryArray: new Array(9).fill(null),
      lastMove: {
        square: null,
        tile: null
      },
      turn: -1,
      victory: null
    });
  };

  const winner = () => {
    let text;
    switch (boardState.victory) {
      case 1:
        text = "AI victory!";
        break;
      case -1:
        text = "Human victory!";
        break;
      case 0:
        text = "Draw!";
        break;
      default:
        text = boardState.turn === 1 ? "AI's turn" : "Human's turn";
        break;
    }
    return (
      <Typography className={classes.block} variant="h6">
        {text}
      </Typography>
    );
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography className={classes.block} variant="h3">
        Ultimate Tic-Tac-Toe
      </Typography>
      {winner()}
      <Grid container justify="center" className={classes.block}>
        <Grid item>
          <Board />
        </Grid>
      </Grid>
      <Button variant="contained" color="secondary" onClick={() => resetBoard()}>
        reset
      </Button>
    </Container>
  );
};

export default App;
