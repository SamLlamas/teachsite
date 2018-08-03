import React from "react";

export const Checkbox = ({ id}) => (
    <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id={id} />
        <label  className="custom-control-label" htmlFor={id}>{id}</label>
    </div>
);
