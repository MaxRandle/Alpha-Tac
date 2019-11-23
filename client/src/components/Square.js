import React, { useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Tile from "./Tile.js";
import { makeStyles } from "@material-ui/core/styles";
import { BoardStateContext } from "../contexts/BoardStateContext";
import { Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RemoveIcon from "@material-ui/icons/Remove";

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

const Square = props => {
  const classes = useStyles();
  const [boardState, setBoardState] = useContext(BoardStateContext);
  const { square } = props;

  const getIcon = () => {
    if (boardState.victoryArray[square] === 1) {
      return (
        <RadioButtonUncheckedIcon
          fontSize="large"
          className={classes.O_Token}
        />
      );
    } else if (boardState.victoryArray[square] === -1) {
      return <CloseIcon fontSize="large" className={classes.X_Token} />;
    } else if (boardState.victoryArray[square] === 0) {
      return <RemoveIcon fontSize="large" className={classes.D_Token} />;
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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.icon}
          >
            <Grid item>{getIcon()}</Grid>
          </Grid>
        </Paper>
      );
    }
  };

  return display();
};

export default Square;
