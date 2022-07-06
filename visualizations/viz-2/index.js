import React, { useContext } from 'react';
import { PlatformStateContext, AutoSizer } from 'nr1'; // https://developer.newrelic.com/explore-docs/intro-to-sdk#components-of-the-sdk
// AutoSizer provides the available height and width if needed
// https://developer.newrelic.com/components/auto-sizer
import VizTwoWidget from './vizTwo';

function VizOneRoot(props) {
  // the props/configuration options that will be passed here are what has been defined in
  // visualizations/viz-1/nr1.json (this is not the root/top level nr1.json file)
  // for all available options see: https://developer.newrelic.com/explore-docs/custom-viz/configuration-options
  console.log(props);

  // PlatformContext contains information about what time range, account and filters are being used
  // https://developer.newrelic.com/components/platform-state-context
  const platformContext = useContext(PlatformStateContext);
  console.log(platformContext);

  // As we treat this as a root component, we pass all the necessary props to the next component (VizOne) to render our widget
  // We do this as it can help when testing if we need to modify props or handle edge cases before sending to our next component as well as simplifying requirements of the next component

  return (
    <div style={{ height: '100%' }}>
      <AutoSizer>
        {({ width, height }) => (
          <VizTwoWidget
            platformContext={platformContext}
            width={width}
            height={height}
            {...props}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default VizOneRoot;
