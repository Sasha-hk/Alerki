/* eslint max-len: 0 */
import { useState } from 'react';
import { NextPage } from 'next';
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
  );
};

export default Home;
