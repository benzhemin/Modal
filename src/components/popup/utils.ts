import {
  PORTAL_POPUP_DOM_NODE,
  PORTAL_MODAL_CONTAINER_PREFIX,
} from "./constant";

let counter = 0;
export const createPopupContainer = (
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

export const createPortalDom = () => {
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

export const findModalContainer = (containerId) => {
  let container = null;
  if (containerId) {
    container = document.querySelector(`#${containerId}`);

    if (!container)
      throw new Error(`not found container dom with id ${containerId}`);
  } else {
    // if containerId is not provided, find the topest container
    const modal = document.querySelector(`#${PORTAL_POPUP_DOM_NODE}`);
    const lastChild = modal.lastChild as Element;

    if (lastChild) {
      const id = lastChild.id;
      if (id.includes(PORTAL_MODAL_CONTAINER_PREFIX)) {
        container = lastChild;
      }
    }
  }
  return container;
};
