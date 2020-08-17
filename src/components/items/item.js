import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./item.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import { green, red } from "@material-ui/core/colors";

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
  appScore: {
    minWidth: 300,
    minHeight: 50,
  },
}));

export default function Item() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const direction = matches ? "row" : "column";
  const imgClass = matches ? "item__card_desktop" : "item__card_mobile";

  const [mainData, setMainData] = useState(null);
  const [score, setScore] = useState(0);
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

  function handleClick(e) {
    if (e === "lower") {
      if (
        mainData[firstItem].searchVolume > mainData[secondItem].searchVolume
      ) {
        setFirstItem(firstItem + 1);
        setSecondItem(secondItem + 1);
        setScore(score + 1);
      } else {
        console.log("LOSE!, it was ", mainData[secondItem].searchVolume);
        setScore(0);
      }
    } else {
      if (
        mainData[firstItem].searchVolume < mainData[secondItem].searchVolume
      ) {
        setFirstItem(firstItem + 1);
        setSecondItem(secondItem + 1);
        setScore(score + 1);
      } else {
        console.log("LOSE!, it was ", mainData[secondItem].searchVolume);
        setScore(0);
      }
    }
  }

  return mainData ? (
    <div className="app">
      <div className="card_css">
        <Card className={classes.appScore} variant="outlined">
          Score: {score}
        </Card>
      </div>
      <Grid
        container
        spacing={0}
        className={classes.root}
        direction={direction}
      >
        <Grid item xs={matches ? 6 : 12} width="100%">
          <div style={{ position: "relative" }}>
            <img
              className={imgClass}
              src={img_base_url + mainData[firstItem].image}
            />
            <div className="item__centered_current">
              <Typography>{mainData[firstItem].keyword}</Typography>
              <Typography>
                Searchs: {formatNumber(mainData[firstItem].searchVolume)}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={matches ? 6 : 12} width="100%">
          <img
            className={imgClass}
            src={img_base_url + mainData[secondItem].image}
          />
          <div className="item__centered_next">
            <Typography>{mainData[secondItem].keyword}</Typography>
            <LowerButton
              className="margin10"
              variant="contained"
              color="primary"
              onClick={() => handleClick("lower")}
            >
              LOWER
            </LowerButton>
            <HigherButton
              className="margin10"
              variant="contained"
              color="primary"
              onClick={() => handleClick("higher")}
            >
              HIGHER
            </HigherButton>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    <p>LOADING!!!</p>
  );
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const LowerButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[900],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

const HigherButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[900],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
