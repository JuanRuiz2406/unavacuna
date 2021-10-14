import React from "react";

import { Global, css } from "@emotion/react";
import Head from "next/head";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = (props) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gray: #3d3d3d;
            --gray2: #6f6f6f;
            --gray3: #e1e1e1;
            --gray4: #575757ff;
            --red: #a31e32;
            --white: #fdfdfd;
            --blue: #1A73E8;
            --input-color: #80868B;
            --border-color: #DADCE0;

            --body-font: 'Roboto', sans-serif;
            --normal-font-size: 1.55rem;
            --small-font-size: 1rem;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-family: "PT Sans", sans-serif;
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 1.5;
            min-height: 100%;
            background: linear-gradient(90deg, rgba(240,253,255,1) 0%, rgba(255,255,255,1) 50%, rgba(240,253,255,1) 100%);
            h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }
          h1,
          h2 {
            font-family: "Roboto Slab", serif;
            font-weight: 700;
          }
          h3 {
            font-family: "PT Sans", sans-serif;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          a {
            text-decoration: none;
          }
        `}
      />
      <Head>
        <title>
          UNA vacuna - Registro población vacunada contra el COVID-19
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <Header />

      <main>{props.children}</main>

      <Footer />
    </>
  );
};
