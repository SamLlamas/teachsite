import React from "react";

export const Radio = ({ id }) => (
    <div className="form-check">
        <input className="form-check-input" type="radio" name={id} id={id} value={id} />
        <label className="form-check-label" htmlFor={id}>
            {id}
        </label>
    </div>
);
