import React from "react";

import "./Loader.css";
import loader from "./loader.gif";
class Loader extends React.Component {
  render() {
    const style = this.props.showLoader ? "inline-block" : "none";
    return (
      <div>
        <img src={loader} className="loader" alt="" style={{ display: style }}></img>
      </div>
    );
  }
}

export default Loader;
