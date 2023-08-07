import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import 'allotment/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';

import { DocumentList } from './js/DocumentList';

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(<DocumentList />);
serviceWorker.unregister();
