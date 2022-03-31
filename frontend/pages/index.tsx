/* eslint max-len: 0 */
import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const [progress, setProgress] = useState(0);
  let progressView = '';

  for (let i = 0; i < progress % 4; i++) {
    progressView += '.';
  }

  setTimeout(() => {
    setProgress(progress + 1);
  }, 1000);

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="Appointment service, appointment management for masters, appointment service for client, make an appointment"
        />
        <meta
          name="description"
          content="Alerki is a useful, handy &amp; modern tool for plan &amp; make an appointment for craftsmen &amp; client"
        />
      </Head>
      <div className="block">
        <div className="welcome-block">
          <span>Welcome on </span><b>Alerki</b>
        </div>
        <small className="loading">Under development{progressView}</small>

        <div className="github-block">
          <a href="https://github.com/Sasha-hk/Alerki">
            <b>GitHub</b> <span>Repository</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
