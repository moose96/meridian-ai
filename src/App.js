import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core/styles';

import { EditorPage, MainPage } from './pages';
import './App.scss';
import { defaultTheme } from './theme';

function App({ voices }) {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Router style={{ minHeight: '100vh' }}>
          <MainPage path="/*" />
          <EditorPage path="/editor" />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
