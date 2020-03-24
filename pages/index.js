import { useState, useEffect } from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import App from '../src/components/App/App';
import DataContainer from '../src/components/Data';

const Container = styled.form`
  display: flex;
`;

const Settings = styled.div`
  display: flex;
  flex-direction: column;
`;

function IndexPage() {
  const [userData, setUserData] = useState({});
  const [settings, setSettings] = useState({ color: 'color', opacity: 100, fontColor: 'white' });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const newSettings = { ...settings, [name]: value };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  useEffect(() => {
    const localSettings = localStorage.getItem('settings');
    const fetchData = async () => {
      const resp = await fetch(`/api/data?endpoint=players`);
      const data = await resp.json();
      setUserData(data);
      if (localSettings) setSettings(JSON.parse(localSettings));
    };

    fetchData();
  }, []);
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <DataContainer data={userData} settings={settings} />
        <Settings>
          Color Settings
          <select onChange={handleChange} defaultValue={settings.color} name="color">
            <option value="color">Full</option>
            <option value="alternate">Alternating</option>
            <option value="none">No colors</option>
          </select>
          {!!(settings.color === 'color') && (
            <>
              <p>Opacity</p>
              <select defaultValue={settings.opacity} name="opacity">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
              </select>
            </>
          )}
          Font Color
          <select defaultValue={settings.fontColor} name="fontColor">
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </Settings>
      </Container>
    </div>
  );
}

export default IndexPage;
