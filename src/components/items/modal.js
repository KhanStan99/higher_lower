import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    margin: "20px",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    minWidth: 300,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  showModal,
  handleModalClose,
  modalMessage,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Opps! Failed</h2>
      {modalMessage ? (
        <div>
          <b id="simple-modal-description">{modalMessage.firstKeyWord} : </b>
          <p id="simple-modal-description">{modalMessage.firstValue}</p> <br />
          <b id="simple-modal-description">{modalMessage.secondKeyword} : </b>
          <p id="simple-modal-description">{modalMessage.secondaValue}</p>
        </div>
      ) : null}
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
