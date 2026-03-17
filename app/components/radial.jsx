import React, { useState, Fragment } from "react";
import { createRoot } from "react-dom/client";
import { AgGauge } from "ag-charts-react";
import {
  AllGaugeModule,
  AnimationModule,
  ContextMenuModule,
  CrosshairModule,
  LegendModule,
  ModuleRegistry,
} from "ag-charts-enterprise";
import clone from "clone";

ModuleRegistry.registerModules([
  AllGaugeModule,
  AnimationModule,
  CrosshairModule,
  LegendModule,
  ContextMenuModule,
]);

const ChartExample = () => {
  const [options, setOptions] = useState({
    type: "radial-gauge",

    value: 85,
    scale: {
      min: 0,
      max: 100,
    },
    segmentation: {
      enabled: true,
      interval: {
        count: 4,
      },
      spacing: 2,
    },
  });

  const setSegmentationInterval = (interval) => {
    const nextOptions = clone(options);

    nextOptions.segmentation.interval = interval;

    setOptions(nextOptions);
  };

  return (
    <Fragment>
      <div className="example-controls">
        <div className="controls-row">
          <button onClick={() => setSegmentationInterval({ step: 10 })}>
            Step: <code>10</code>
          </button>
          <button onClick={() => setSegmentationInterval({ count: 4 })}>
            Count: <code>4</code>
          </button>
          <button
            onClick={() => setSegmentationInterval({ values: [40, 50, 60] })}
          >
            Values: <code>[40, 50, 60]</code>
          </button>
        </div>
      </div>
      <AgGauge options={options} />
    </Fragment>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<ChartExample />);

export default ChartExample;