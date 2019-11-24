import React, { useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Tile from "./Tile.js";
import { makeStyles } from "@material-ui/core/styles";
import { BoardStateContext } from "../contexts/BoardStateContext";
import { Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RemoveIcon from "@material-ui/icons/Remove";
const axios = require("axios");

const useStyles = makeStyles(theme => ({
  square: {
    margin: "4px"
  },
  bigSquare: {
    width: "128px",
    height: "128px",
    textAlign: "center",
    margin: "6px",
    backgroundColor: "#303030"
  },
  icon: {
    height: "100%"
  },
  O_Token: {
    color: "white"
  },
  X_Token: {
    color: "red"
  },
  D_Token: {
    color: "grey"
  }
}));

const callAI = async boardState => {
  const request = {
    method: "POST",
    url: "http://172.18.0.3:8080/move",
    // url: "http://app-network:8080/move",
    // url: "http://localhost:8080/move",
    headers: {
      "Content-Type": "application/json"
    },
    data: boardState
  };
  try {
    const response = await axios(request);
    return response;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

const Square = props => {
  const classes = useStyles();
  const [boardState, setBoardState] = useContext(BoardStateContext);
  const { square } = props;

  const getIcon = () => {
    if (boardState.victoryArray[square] === 1) {
      return <RadioButtonUncheckedIcon fontSize="large" className={classes.O_Token} />;
    } else if (boardState.victoryArray[square] === -1) {
      return <CloseIcon fontSize="large" className={classes.X_Token} />;
    } else if (boardState.victoryArray[square] === 0) {
      return <RemoveIcon fontSize="large" className={classes.D_Token} />;
    }
  };

  useEffect(() => {
    if (boardState.lastMove.square === square) {
      console.log(`useEffect square ${square}`);
      // check local victory
      boardState.victoryArray[square] = checkVictory(boardState.boardArray[square]);
      // check global victory
      boardState.victory = checkVictory(boardState.victoryArray);
      // update state
      setBoardState({
        ...boardState,
        victoryArray: boardState.victoryArray,
        victory: boardState.victory
      });
      if (boardState.turn === 1) {
        const aiPlay = async () => {
          // get ai move
          const res = await callAI(boardState);
          const { square, tile } = res.data;
          // play the move
          boardState.boardArray[square][tile] = boardState.turn;
          // update state
          setBoardState({
            ...boardState,
            boardArray: boardState.boardArray,
            lastMove: { square, tile },
            turn: boardState.turn * -1
          });
        };
        aiPlay();
      }
    }
  }, [boardState.lastMove]);

  const checkVictory = array => {
    let vicArray = [
      array[0] + array[1] + array[2],
      array[3] + array[4] + array[5],
      array[6] + array[7] + array[8],
      array[0] + array[3] + array[6],
      array[1] + array[4] + array[7],
      array[2] + array[5] + array[8],
      array[0] + array[4] + array[8],
      array[2] + array[4] + array[6]
    ];
    if (Math.max(...vicArray) === 3) {
      return 1;
    } else if (Math.min(...vicArray) === -3) {
      return -1;
    } else if (array.indexOf(null) === -1) {
      return 0;
    } else {
      return null;
    }
  };

  const display = () => {
    if (boardState.victoryArray[square] === null) {
      return (
        <Grid container direction="column" className={classes.square}>
          <Grid item>
            <Grid container>
              <Grid item>
                <Tile square={props.square} tile={0} />
              </Grid>
              <Grid item>
                <Tile square={props.square} tile={1} />
              </Grid>
              <Grid item>
                <Tile square={props.square} tile={2} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container>
              <Grid item>
                <Tile square={props.square} tile={3} />
              </Grid>
              <Grid item>
                <Tile square={props.square} tile={4} />
              </Grid>
              <Grid item>
                <Tile square={props.square} tile={5} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container>
              <Grid item>
                <Tile square={props.square} tile={6} />
              </Grid>
              <Grid item>
                <Tile square={props.square} tile={7} />
              </Grid>
              <Grid item>
                <Tile square={props.square} tile={8} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Paper className={classes.bigSquare}>
          <Grid container direction="row" justify="center" alignItems="center" className={classes.icon}>
            <Grid item>{getIcon()}</Grid>
          </Grid>
        </Paper>
      );
    }
  };

  return display();
};

export default Square;
