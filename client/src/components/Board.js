import React, { useState, useContext, useEffect } from "react";
import Square from "./Square";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { BoardStateContext } from "../contexts/BoardStateContext";

const useStyles = makeStyles(theme => ({}));

const Board = () => {
  const classes = useStyles();
  const [boardState, setBoardState] = useContext(BoardStateContext);

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container>
          <Grid item>
            <Square square={0} />
          </Grid>
          <Grid item>
            <Square square={1} />
          </Grid>
          <Grid item>
            <Square square={2} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container>
          <Grid item>
            <Square square={3} />
          </Grid>
          <Grid item>
            <Square square={4} />
          </Grid>
          <Grid item>
            <Square square={5} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container>
          <Grid item>
            <Square square={6} />
          </Grid>
          <Grid item>
            <Square square={7} />
          </Grid>
          <Grid item>
            <Square square={8} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
