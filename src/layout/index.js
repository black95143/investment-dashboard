import React from "react";
import Header from "./header";
import Body from "./body";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Body {...props} />
    </React.Fragment>
  );
};

export default Layout;