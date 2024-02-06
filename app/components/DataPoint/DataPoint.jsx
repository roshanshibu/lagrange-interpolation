import { useState } from "react";
import "./DataPoint.css";

const DataPoint = ({
  x,
  y,
  index,
  updateDataPoint,
  removeDataPoint,
  FocusIndex,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={"dataItem " + (isFocused ? "" : "extraPadding")}
      onFocus={(e) => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    >
      <input
        type="number"
        id="dataX"
        className="dataXInput"
        value={Number(x).toString()}
        onChange={(e) => {
          updateDataPoint(e.target.value, y, index);
        }}
      />
      <input
        type="number"
        id="dataY"
        className="dataYInput"
        value={Number(y).toString()}
        autoFocus={index == FocusIndex}
        onChange={(e) => {
          updateDataPoint(x, e.target.value, index);
        }}
      />
      {index != 0 && (
        <button
          onClick={() => removeDataPoint(index)}
          className={"removeDataPointButton " + (isFocused ? "show" : "hide")}
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default DataPoint;
