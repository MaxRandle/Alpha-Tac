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

const Tile = props => {
  const classes = useStyles();
  const [boardState, setBoardState] = useContext(BoardStateContext);
  const [legal, setLegal] = useState(true);
  const { square, tile } = props;

  const getIcon = () => {
    if (boardState.boardArray[square][tile] === 1) {
      return <RadioButtonUncheckedIcon fontSize="large" className={classes.O_Token} />;
    } else if (boardState.boardArray[square][tile] === -1) {
      return <CloseIcon fontSize="large" className={classes.X_Token} />;
    }
  };

  const handleClick = () => {
    if (legal) {
      // play the move
      boardState.boardArray[square][tile] = boardState.turn;

      // check local victory
      boardState.victoryArray[square] = checkVictory(boardState.boardArray[square]);

      // check global victory
      boardState.victory = checkVictory(boardState.victoryArray);

      setBoardState({
        ...boardState,
        victoryArray: boardState.victoryArray,
        boardArray: boardState.boardArray,
        lastMove: { square, tile },
        turn: boardState.turn * -1,
        victory: boardState.victory
      });

      // call ai
    }
  };

  useEffect(() => {
    isLegal();
  });

  const isLegal = () => {
    if (
      (boardState.lastMove.tile === square ||
        boardState.lastMove.tile === null ||
        boardState.victoryArray[boardState.lastMove.tile] !== null) &&
      boardState.boardArray[square][tile] === null &&
      boardState.victory === null
      // && boardState.turn === -1 // for when AI gets involved
    ) {
      setLegal(true);
    } else {
      setLegal(false);
    }
  };

  return (
    <Paper onClick={() => handleClick()} className={`${classes.tile} ${legal ? classes.legal : classes.illegal}`}>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.icon}>
        <Grid item>{getIcon()}</Grid>
      </Grid>
    </Paper>
  );
};

export default Tile;
