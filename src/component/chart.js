import React from 'react';
import * as V from 'victory';

export default function Chart(props) {
console.log(props.data.historical);
  if (props.data.length === 0) {
    return (<p>there is no data</p>)
  } else {

    return (
      <V.VictoryChart
        theme={V.VictoryTheme.material}
        height={200}
      >
        <V.VictoryLabel
          text="Closing Price" x={190} y={30}
          textAnchor="middle" />
        <V.VictoryAxis
          tickFormat={(t) => {
            if (props.data.length < 10) {
              if (typeof t !== "string") {
                return t.toString().slice(2, 10);
              } else {
                return t.slice(2, 10);
              }
            }
            if (t.slice(8, 10) % 30 === 0) {
              if (typeof t !== "string") {
                return t.toString().slice(2, 10);
              } else {
                return t.slice(2, 10);
              }
            }
          }}
        />
        <V.VictoryAxis dependentAxis />
        <V.VictoryLine

          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          data={props.data.map((closeData) => ({
            x: closeData.date, y: closeData.close
          }))}
        />
      </V.VictoryChart>
    );
  }
}