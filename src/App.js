import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core/styles';

import { EditorPage, MainPage } from './pages';
//TODO: Rename this page
import LandingPage from './pages/LandingPage';
import './App.scss';
import { defaultTheme } from './theme';

function App({ voices }) {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Router style={{ minHeight: '100vh' }}>
          <MainPage path="/*" />
          <EditorPage path="/editor" />
          <LandingPage path="/" />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
