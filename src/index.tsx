import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.module.scss';

const Main = () => <div>hello world man</div>;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Main />);
}
