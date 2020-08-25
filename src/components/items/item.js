import Button from "@material-ui/core/Button";
import { green, red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import SimpleModal from "./modal";
import "./item.css";

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

  const [loadMsg, setLoadMsg] = useState("Loading... Please wait!");
  const [mainData, setMainData] = useState(null);
  const [score, setScore] = useState(0);
  const [firstItem, setFirstItem] = useState(0);
  const [secondItem, setSecondItem] = useState(1);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMsg, setAlertMsg] = useState("null");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

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
          setLoadMsg(
            "Opps! Looks like we ran into an issue, Please contact me here: https://twitter.com/KhanStan99 --- Error Log: " + error
          );
        }
      );
  }, []);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = (e) => {
    if (e === "lower") {
      if (
        mainData[secondItem].searchVolume <= mainData[firstItem].searchVolume
      ) {
        won();
      } else {
        lost();
      }
    } else {
      if (
        mainData[secondItem].searchVolume >= mainData[firstItem].searchVolume
      ) {
        won();
      } else {
        lost();
      }
    }
    setOpen(true);
  };

  const won = () => {
    setAlertType("success");
    setAlertMsg(
      "SUCCESS! " +
        mainData[firstItem].keyword +
        ": " +
        formatNumber(
          mainData[firstItem].searchVolume +
            "\n" +
            mainData[secondItem].keyword +
            ": " +
            formatNumber(mainData[secondItem].searchVolume)
        )
    );
    setFirstItem(firstItem + 1);
    setSecondItem(secondItem + 1);
    setScore(score + 1);
  };

  const lost = () => {
    setAlertMsg("FAILED!");

    if (localStorage.getItem("highScore") < score) {
      localStorage.setItem("highScore", score);
    }
    setModalMessage({
      firstKeyWord: mainData[firstItem].keyword,
      firstValue: formatNumber(mainData[firstItem].searchVolume),
      secondKeyword: mainData[secondItem].keyword,
      secondaValue: formatNumber(mainData[secondItem].searchVolume),
    });

    setShowModal(true);
    setAlertType("error");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setScore(0);
    setMainData(shuffle(mainData));
  };

  const retry = () => {
    setShowModal(false);
    setScore(0);
    setMainData(shuffle(mainData));
  };

  return mainData ? (
    <div className="app">
      <SimpleModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        modalMessage={modalMessage}
        score={score}
        retry={retry}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <div className="card_css">
        <Typography variant="h4">
          Score: {score}
        </Typography>
        {localStorage.getItem("highScore") ? (
          <Typography variant="h5">
            Highscore: {localStorage.getItem("highScore")}
          </Typography>
        ) : null}
      </div>
      <Grid
        container
        spacing={0}
        className={classes.root}
        direction={direction}
      >
        <Grid item xs={matches ? 6 : 12} width="100%">
          <div className="app__items">
            <img
              className={imgClass}
              alt={mainData[firstItem].keyword}
              src={img_base_url + mainData[firstItem].image}
            />
            <div className="item__centered_current">
              <Typography variant="h3">
                {mainData[firstItem].keyword}
              </Typography>
              <Typography variant="h4">
                Searches: {formatNumber(mainData[firstItem].searchVolume)}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={matches ? 6 : 12} width="100%">
          <div className="app__items">
            <img
              className={imgClass}
              alt={mainData[secondItem].keyword}
              src={img_base_url + mainData[secondItem].image}
            />
            <div className="item__centered_next">
              <Typography display="inline" align="center" variant="h3">
                {mainData[secondItem].keyword}
              </Typography>
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
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    <p>{loadMsg}</p>
  );
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const LowerButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    width: "100%",
    backgroundColor: red[900],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

const HigherButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[900]),
    width: "100%",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[900],
    },
  },
}))(Button);

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
