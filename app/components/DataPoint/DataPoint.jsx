import { useState } from "react";
import "./DataPoint.css";

const DataPoint = ({ x, y, index, updateDataPoint, removeDataPoint }) => {
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
        value={x}
        size={20}
        onChange={(e) => {
          updateDataPoint(e.target.value, y, index);
        }}
        onFocus={(e) => {
          e.target.select();
        }}
      />
      <input
        type="number"
        id="dataY"
        className="dataYInput"
        value={y}
        onChange={(e) => {
          updateDataPoint(x, e.target.value, index);
        }}
        onFocus={(e) => {
          e.target.select();
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
