import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    display: "flex",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    flexDirection: "column",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    minWidth: 300,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  showModal,
  handleModalClose,
  modalMessage,
  score,
  retry,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" align="center">
        <b>
          Opps Failed!
          <br />
          FINAL SCORE: {score}
        </b>
      </Typography>
      {modalMessage ? (
        <div style={{ margin: "20px" }}>
          <Typography variant="h6">
            <b>{modalMessage.firstKeyWord} : </b>
            {modalMessage.firstValue}
          </Typography>
          <Typography variant="h6">
            <b>{modalMessage.secondKeyword} : </b>
            {modalMessage.secondaValue}
          </Typography>
        </div>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        onClick={() => retry()}
      >
        Retry
      </Button>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={showModal ? showModal : false}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
