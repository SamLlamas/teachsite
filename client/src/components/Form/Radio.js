import React from "react";

export const Radio = ({ id, radioname }) => (
    <div className="form-check">
        <input className="form-check-input" type="radio" name={radioname} id={id} value={id} />
        <label className="form-check-label" htmlFor={id}>
            {id}
        </label>
    </div>
);
