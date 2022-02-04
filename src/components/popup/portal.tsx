import React, { ReactElement } from "react";

export const GeneralOverlay = (props: { children: ReactElement }) => {
  return <div className="fixOverlay">{props.children}</div>;
};

export class Portal extends React.PureComponent<{
  children: JSX.Element;
  container: Element;
}> {
  render(): React.ReactNode {
    const { children, container } = this.props;
    return ReactDOM.createPortal(children, container);
  }
}
