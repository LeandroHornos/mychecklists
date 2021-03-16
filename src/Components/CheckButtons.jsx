import React from "react";

const CheckButtons = (props) => {
  return (
    <div
      className="d-flex justify-content-between checklist-button-group"
      onChange={(e) => {
        console.log(e.target.value, "field: " + props.field.id);
        props.updateFieldStatus(props.field.id, e.target.value);
      }}
    >
      <input type="radio" name={`option-${props.field.id}`} value="ignored" />
      <input type="radio" name={`option-${props.field.id}`} value="checked" />
      <input
        type="radio"
        name={`option-${props.field.id}`}
        value="unchecked"
        defaultChecked
      />
    </div>
  );
};

export default CheckButtons;
