import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { red, blue } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import "./item.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Item() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const direction = matches ? "row" : "column";
  const imgClass = matches ? "item__card_desktop" : "item__card_mobile";
  return (
    <Grid
      container
      justify="flex-start"
      spacing={0}
      className={classes.root}
      direction={direction}
    >
      <Grid item xs={matches ? 6 : 12} width="100%">
        <img
          className={imgClass}
          src="http://api.higherlowergame.com/_client/images/general/yoko-ono.jpg"
        />
      </Grid>
      <Grid item xs={matches ? 6 : 12} width="100%">
        <img
          className={imgClass}
          src="http://api.higherlowergame.com/_client/images/general/tas-pappas.jpg"
        />
      </Grid>
    </Grid>
  );
}
