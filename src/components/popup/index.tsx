import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import "../../assets/scss/overlay.scss";
import { PORTAL_POPUP_DOM_NODE } from "./constant";

import {
  findModalContainer,
  createPopupContainer,
  createPortalDom,
} from "./utils";

import { Portal, GeneralOverlay } from "./portal";

export type PopupOptions = {
  Component: (props: { id: string; container: Element }) => JSX.Element;
};

export const addPopup = (options: PopupOptions) => {
  const { Component: ModalContent } = options;
  const portalDom = createPortalDom();
  const { id, container } = createPopupContainer(portalDom);

  ReactDOM.render(
    <Portal container={container}>
      <GeneralOverlay>
        <ModalContent id={id} container={container} />
      </GeneralOverlay>
    </Portal>,
    container,
  );

  return {
    containerId: id,
  };
};

export const removePopup = (option) => {
  const { containerId } = option;
  const { document } = window;

  const containerDom = findModalContainer(containerId);

  if (containerDom) {
    ReactDOM.unmountComponentAtNode(containerDom);
    containerDom.parentNode.removeChild(containerDom);
  }

  // if containerId is not provied && no containerDom found
  if (!containerId && !containerDom) {
    const modal = document.querySelector(`#${PORTAL_POPUP_DOM_NODE}`);
    ReactDOM.unmountComponentAtNode(modal);

    // clean up all children
    while (modal.firstChild) {
      modal.removeChild(modal.lastChild);
    }
  }
};
