import React, { useEffect, useState } from 'react';
import { NrqlQuery, Spinner, BillboardChart, NerdGraphQuery } from 'nr1';
import ErrorState from './errorState';
import { timeRangeToNrql, discoverErrors } from './utils'; // externalize any helper utilities

function VizOneWidget(props) {
  console.log('props passed from root-> ', props); // we can log out what props were sent over from the root component
  const {
    width,
    height,
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

    NerdGraphQuery.query({
      query: `{
        actor {
          entitySearch(query: "name like '%' and tags.accountId IN ('1061074')") {
            count
            results {
              entities {
                guid
                name
              }
            }
          }
        }
      }`
    }).then(({ data }) => {
      const entitySearchData = data?.actor?.entitySearch;
      storeSomeData(entitySearchData);
    });
  }, []);

  // handle any errors if required to help prevent failures and crashes
  const errors = discoverErrors(props);
  if (errors.length > 0) {
    return <ErrorState errors={errors} />;
  }

  let finalQuery = query;

  // testing the time range and the filters are quite difficult without deploying
  const timeRangeNrql = timeRangeToNrql(timeRange);

  if (useTimePicker) {
    finalQuery += ` ${timeRangeNrql}`;
  }

  console.log('NRQL Query-> ', finalQuery);

  // access someData from what we queried in the useEffect block
  console.log('someData-> ', someData);

  return (
    <div>
      <NrqlQuery
        query={finalQuery}
        accountIds={[parseInt(accountId)]}
        pollInterval={NrqlQuery.AUTO_POLL_INTERVAL}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <Spinner />;
          }

          if (error) {
            return (
              <ErrorState errors={[error?.message || '']} query={finalQuery} />
            );
          }

          if (data) {
            console.log('NrqlQuery Data-> ', data);
            return (
              <>
                NRQL Data!:
                <br /> {JSON.stringify(data)}
                <br />
                {/* All available NR1 charts https://developer.newrelic.com/components/charts */}
                <BillboardChart data={data} />
              </>
            );
          }

          return <div>No data to render</div>;
        }}
      </NrqlQuery>
    </div>
  );
}

export default VizOneWidget;
