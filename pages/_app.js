import App from 'next/app';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../src/data/cssTheme';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`

body, html{
  margin: 0;
  font-family: ${(props) => props.theme.textFont};
  max-width: 100vw;
  background-color: #efefef;
  font-size: 18px;
}
*{
  box-sizing: border-box;
}

`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900|Roboto&display=swap"
            />
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}
