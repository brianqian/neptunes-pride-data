import { useState, useEffect } from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import App from '../src/components/App/App';
import DataContainer from '../src/components/Data';

const DataSelection = styled.form`
  display: flex;
`;

function IndexPage() {
  const [userData, setUserData] = useState({});
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/api/data?endpoint=players`);

      const data = await resp.json();

      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DataSelection>
        {/* <input type="button" name="Players" value="Players" /> */}
        {/* <input type="button" name="Stars" value="Stars" />
        <input type="button" name="Full" value="Full" />
        <input type="button" name="Basic" value="Basic" /> */}
      </DataSelection>
      <DataContainer data={userData} />
    </div>
  );
}

export default IndexPage;
