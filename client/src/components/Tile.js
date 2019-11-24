import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core/";
import { BoardStateContext } from "../contexts/BoardStateContext";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  tile: {
    width: "40px",
    height: "40px",
    textAlign: "center",
    lineHeight: "100%",
    margin: "2px"
  },
  illegal: {
    backgroundColor: "#303030"
  },
  legal: {
    backgroundColor: "#4050B0"
  },
  icon: {
    height: "100%"
  },
  O_Token: {
    color: "white"
  },
  X_Token: {
    color: "red"
  }
}));

const Tile = props => {
  const classes = useStyles();
  const [boardState, setBoardState] = useContext(BoardStateContext);
  const [legal, setLegal] = useState(true);
  const { square, tile } = props;

  const handleClick = () => {
    if (legal) {
      //play move
      boardState.boardArray[square][tile] = boardState.turn;
      setBoardState({
        ...boardState,
        boardArray: boardState.boardArray,
        lastMove: { square, tile },
        turn: boardState.turn * -1
      });
    }
  };

  const getIcon = () => {
    if (boardState.boardArray[square][tile] === 1) {
      return <RadioButtonUncheckedIcon fontSize="large" className={classes.O_Token} />;
    } else if (boardState.boardArray[square][tile] === -1) {
      return <CloseIcon fontSize="large" className={classes.X_Token} />;
    }
  };

  useEffect(() => {
    console.log("useEffect Tile");
    //check tile is legal
    if (
      (boardState.lastMove.tile === square ||
        boardState.lastMove.tile === null ||
        boardState.victoryArray[boardState.lastMove.tile] !== null) &&
      boardState.boardArray[square][tile] === null &&
      boardState.victory === null &&
      boardState.turn === -1 // for when AI gets involved
    ) {
      setLegal(true);
    } else {
      setLegal(false);
    }
  }, [boardState.lastMove]);

  return (
    <Paper onClick={() => handleClick()} className={`${classes.tile} ${legal ? classes.legal : classes.illegal}`}>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.icon}>
        <Grid item>{getIcon()}</Grid>
      </Grid>
    </Paper>
  );
};

export default Tile;
