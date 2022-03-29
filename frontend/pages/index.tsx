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
      Under development{progressView}
    </div>
  );
};

export default Home;
