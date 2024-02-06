"use client";

import { useEffect, useState } from "react";
import DataPoint from "./components/DataPoint/DataPoint";
import "./page.css";

export default function Home() {
  const [DataPoints, setDataPoints] = useState([{ x: 1, y: 0 }]);
  const [Target, setTarget] = useState(1);
  const [Result, setResult] = useState(0);
  const [Error, setError] = useState(false);
  const [FocusIndex, setFocusIndex] = useState(null);

  const addNewDataPoint = () => {
    setDataPoints([
      ...DataPoints,
      { x: +DataPoints[DataPoints.length - 1].x + 1, y: 0 },
    ]);
    setFocusIndex(DataPoints.length);
  };

  const updateDataPoint = (newX, newY, index) => {
    setDataPoints(
      DataPoints.map((d, i) => {
        if (i == index) {
          d.x = +newX;
          d.y = +newY;
        }
        return d;
      })
    );
  };
  const removeDataPoint = (index) => {
    setDataPoints(DataPoints.filter((d, i) => i != index));
  };

  function hasDuplicateX(array) {
    let encounteredXValues = {};
    for (let obj of array) {
      if (encounteredXValues[obj.x]) {
        return true;
      } else {
        encounteredXValues[obj.x] = true;
      }
    }
    return false;
  }

  function interpolate() {
    let f = DataPoints;
    let xi = Target;

    // check if there are duplicate X values
    if (hasDuplicateX(DataPoints)) {
      console.log("remove duplicates!");
      setError(true);
      return;
    }

    setError(false);
    let result = 0;
    let n = f.length;
    for (let i = 0; i < n; i++) {
      let term = f[i].y;
      for (let j = 0; j < n; j++) {
        if (j != i) term = (term * (xi - f[j].x)) / (f[i].x - f[j].x);
      }
      result += term;
    }
    setResult(result);
  }

  useEffect(() => {
    interpolate();
  }, [DataPoints, Target]);

  return (
    <main>
      <h1 className="branding">
        Lagrange <span>INTERPOLATION</span>
      </h1>

      <section className="dataContainer">
        {DataPoints.map((dataPoint, index) => {
          return (
            <DataPoint
              key={index}
              x={dataPoint.x}
              y={dataPoint.y}
              index={index}
              updateDataPoint={updateDataPoint}
              removeDataPoint={removeDataPoint}
              FocusIndex={FocusIndex}
            />
          );
        })}
        <button onClick={addNewDataPoint} className="addDataPointButton">
          +
        </button>
      </section>
      <section className="computeContainer">
        <p>
          Interpolate n<sup>th</sup> term,
        </p>
        <div className="targetContainer">
          <p>n =</p>
          <input
            type="number"
            value={Number(Target).toString()}
            defaultValue={1}
            placeholder="1"
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
      </section>
      {Error ? (
        <p className="error">Error! Duplicate x values</p>
      ) : (
        <p className="result">{Math.round(Result * 1000) / 1000}</p>
      )}
    </main>
  );
}
