import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./item.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const base_url = "https://api.jsonbin.io/b/5f3978d4af209d1016bcadc5";
const img_base_url = "http://api.higherlowergame.com/_client/images/general/";

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

  const [mainData, setMainData] = useState(null);
  const [firstItem, setFirstItem] = useState(0);
  const [secondItem, setSecondItem] = useState(1);

  useEffect(() => {
    fetch(base_url, {
      headers: {
        "secret-key":
          "$2a$10$9d0LIqF4KQ1JLDGDbamPtewIS4ZpGSPW5rhWwd3W/QETlc9CaNcm6",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setMainData(shuffle(result));
        },
        (error) => {
          console.log("Errr", error);
        }
      );
  }, []);

  return mainData ? (
    <Grid container spacing={0} className={classes.root} direction={direction}>
      <Grid item xs={matches ? 6 : 12} width="100%">
        <div style={{ position: "relative" }}>
          <img
            className={imgClass}
            src={img_base_url + mainData[firstItem].image}
          />
          <div
            style={{ color: "white", position: "absolute", top: "10px" }}
          ></div>
        </div>
      </Grid>
      <Grid item xs={matches ? 6 : 12} width="100%" >
        <img
          className={imgClass}
          src={img_base_url + mainData[secondItem].image}
        />
        <div className="item__centered">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setFirstItem(firstItem + 1);
              setSecondItem(secondItem + 1);
            }}
          >
            Click me
          </Button>
        </div>
      </Grid>
    </Grid>
  ) : (
    <p>LOADING!!!</p>
  );
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
