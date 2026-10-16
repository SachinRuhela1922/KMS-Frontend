import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Global styles - keep this order (same as the original <link> order)
import './assets/css/bootstrap.min.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/owl.theme.default.min.css';
import './assets/css/font-awesome.min.css';
import './assets/css/magnific-popup.min.css';
import './assets/css/custom-bootstrap-margin-padding.css';
import './assets/css/utility-classes.css';
import './assets/css/style.css';

import App from './App.jsx';
import { ContentProvider } from './context/ContentContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <App />
      </ContentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
