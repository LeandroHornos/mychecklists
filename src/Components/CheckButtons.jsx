import React from "react";

const CheckButtons = (props) => {
  return (
    <div
      className="d-flex justify-content-between checklist-button-group"
      onChange={(e) => {
        console.log(e.target.value, "item: " + props.item.id);
        props.updateItemStatus(props.item.id, e.target.value);
      }}
    >
      <input type="radio" name={`option-${props.item.id}`} value="omitted" />
      <input type="radio" name={`option-${props.item.id}`} value="checked" />
      <input
        type="radio"
        name={`option-${props.item.id}`}
        value="unchecked"
        defaultChecked
      />
    </div>
  );
};

export default CheckButtons;
