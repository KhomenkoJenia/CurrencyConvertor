import React from "react";

const CastomInput = (props) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <label>{props.label}</label>
        <input
          className="result"
          type="number"
          value={props.value}
          onChange={(event) => props.onValueChange(event.target.value)}
          disabled={props.disabled}
        />
        <select
          value={props.currency}
          onChange={(event) => props.onCurrencyChange(event.target.value)}
        >
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </section>
  );
};

export default CastomInput;
