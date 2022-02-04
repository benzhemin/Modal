import React from "react";
import { addPopup, removePopup } from "./popup";

import "../assets/scss/content.scss";

const closeIcon = require("../assets/img/close.svg");

const CloseBlock = (props) => {
  const { handleClickClose } = props;

  const onClickClose = () => {
    handleClickClose && handleClickClose();
  };

  return (
    <div className="closeWrapper" onClick={onClickClose}>
      <div
        style={{
          background: `url(${closeIcon.default}) no-repeat 50%`,
          width: "1rem",
          height: "1rem",
        }}
      />
    </div>
  );
};

const ModalContent = (props: { id: string }) => {
  const { id } = props;
  const onCloseClick = () => {
    console.log("clicked content");
    removePopup({ containerId: id });
  };

  const onConfirmClick = () => {
    addPopup({
      Component: AnotherContent,
    });
  };

  return (
    <div className="modalContainer">
      <CloseBlock handleClickClose={onCloseClick} />
      <div>
        <button onClick={onCloseClick}>cancel</button>
        <button onClick={onConfirmClick}>confirm</button>
      </div>
    </div>
  );
};

const AnotherContent = (props: { id: string }) => {
  const { id } = props;

  const onCloseClick = () => {
    console.log("clicked content");
    removePopup({ containerId: id });
  };

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        background: "#fff",
      }}
      onClick={onCloseClick}
    >
      anther content.
    </div>
  );
};

export const ModalDemo = () => {
  const onClickPopupModal = () => {
    addPopup({ Component: ModalContent });
  };

  return (
    <div>
      <button onClick={onClickPopupModal}>Popup Modal</button>
    </div>
  );
};
