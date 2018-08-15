import React from "react";

export const Checkbox = ({id, check, change, name} ) => (
    <div className="custom-control custom-checkbox">
        <input name={name} checked ={check} onChange= {change}type="checkbox" className="custom-control-input" id={id} />
        <label  className="custom-control-label" htmlFor={id}>{id}</label>
    </div>
);
