// FROM SystemSample SELECT average(cpuPercent) TIMESERIES 5 seconds FACET entityName

import React, { useEffect, useState } from 'react';
import { NrqlQuery, LineChart, BillboardChart } from 'nr1';
import ErrorState from './errorState';
import { timeRangeToNrql, discoverErrors } from './utils'; // externalize any helper utilities

function VizTwoWidget(props) {
  console.log('props passed from root-> ', props); // we can log out what props were sent over from the root component
  const {
    width,
    height,
    pollIntervalSeconds,
    accountId,
    useTimePicker,
    platformContext,
    query
  } = props;
  const { timeRange } = platformContext;
  const [someData, storeSomeData] = useState(null); // we can setup state to store and access data if required

  // using useEffect, with an empty array is the equivalent to componentDidMount
  // any actions we want to do immediately only on mount we can do here
  useEffect(() => {
    // fetch something from NerdGraph directly
    // https://developer.newrelic.com/components/nerd-graph-query
    // https://api.newrelic.com/graphiql

    const widgetPoll = setInterval(async () => {
      if (pollIntervalSeconds && accountId && query) {
        console.log(`fetchingData every ${pollIntervalSeconds} seconds`);

        let finalQuery = query;

        // testing the time range and the filters are quite difficult without deploying
        const timeRangeNrql = timeRangeToNrql(timeRange);

        if (useTimePicker) {
          finalQuery += ` ${timeRangeNrql}`;
        }

        console.log('NRQL Query-> ', finalQuery);

        const result = await NrqlQuery.query({
          query: `${finalQuery}`, // WHERE ${new Date().getTime()} != 1
          accountIds: [parseInt(accountId)]
        });

        storeSomeData(result);

        //
      }
    }, (parseInt(pollIntervalSeconds) || 5) * 1000);

    // returned function will be called on component unmount
    return () => {
      // clean up interval
      clearInterval(widgetPoll);
    };
  }, [pollIntervalSeconds, accountId, useTimePicker, query]); // useEffect will trigger only when these values are updated

  // handle any errors if required to help prevent failures and crashes
  const errors = discoverErrors(props);
  if (errors.length > 0) {
    return <ErrorState errors={errors} />;
  }

  // access someData from what we queried in the useEffect block
  console.log('someData-> ', someData);

  if (someData) {
    return <LineChart data={someData?.data} fullHeight fullWidth />;
  }

  return <div>hello</div>;
}

export default VizTwoWidget;
