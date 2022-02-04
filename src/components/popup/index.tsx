import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import "../../assets/scss/overlay.scss";
import {
  PORTAL_POPUP_DOM_NODE,
  PORTAL_MODAL_CONTAINER_PREFIX,
} from "./constant";

import { findModalContainer } from "./utils";

export const GeneralOverlay = (props: { children: ReactElement }) => {
  return <div className="fixOverlay">{props.children}</div>;
};

export type PopupOptions = {
  Component: (props: { id: string; container: Element }) => JSX.Element;
};

let counter = 0;

const createPortalDom = () => {
  const { document } = window;
  let portalDom = document.querySelector(`#${PORTAL_POPUP_DOM_NODE}`);

  if (!portalDom) {
    portalDom = document.createElement("div");
    portalDom.setAttribute("id", PORTAL_POPUP_DOM_NODE);
    const appDom = document.querySelector(`div.app`);
    appDom.appendChild(portalDom);
  }

  return portalDom;
};

const createPopupContainer = (
  portalDom: Element,
): { id: string; container: Element } => {
  const { document } = window;
  const id = `${PORTAL_MODAL_CONTAINER_PREFIX}-${counter}`;
  counter += 1;

  const container = document.createElement("div");
  container.setAttribute("id", id);

  portalDom.appendChild(container);

  return {
    id,
    container,
  };
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

class Portal extends React.PureComponent<{
  children: JSX.Element;
  container: Element;
}> {
  render(): React.ReactNode {
    const { children, container } = this.props;
    return ReactDOM.createPortal(children, container);
  }
}
