import {
  PORTAL_POPUP_DOM_NODE,
  PORTAL_MODAL_CONTAINER_PREFIX,
} from "./constant";

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
