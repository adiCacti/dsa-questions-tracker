import Document, { Head, Main, NextScript, Html } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Primary meta tags */}
          <meta name='title' content='DSA Questions Tracker' />
          <meta
            name='description'
            content='DSA questions tracker app using localbase 🚀. Curated list of 400+ topic wise questions to make you a DSA Maestro.'
          />

          {/* Open graph / facebook */}
          <meta property='og:type' content='website' />
          {/* website url needs to be added */}
          <meta property='og:url' content='' />
          <meta property='og:title' content='DSA Questions Tracker App' />
          <meta
            property='og:description'
            content='Crack your fear of solving DSA 🔥. Curated list of 400+ topic wise questions to make you a DSA Maestro.'
          />
          <meta property='og:image' content='/logo512.png' />

          {/* Twitter */}
          <meta property='twitter:card' content='summary_large_image' />
          {/* website url needs to be added */}
          <meta property='twitter:url' content='' />
          <meta property='twitter:title' content='DSA Questions Tracker App' />
          <meta
            property='twitter:description'
            content='Crack your fear of solving DSA 🔥. Curated list of 400+ topic wise questions to make you a DSA Maestro.'
          />
          <meta property='twitter:image' content='/logo512.png' />

          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />

          {/* Fonts Material UI */}
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
