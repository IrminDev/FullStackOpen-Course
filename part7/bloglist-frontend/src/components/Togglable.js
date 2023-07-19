import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button  onClick={toggleVisibility} className="button-show bg-slate-800 py-2 px-4 text-white rounded-lg">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} className="button-hide bg-red-600 py2
         px-3 rounded-lg text-white mt-3">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Togglable;
