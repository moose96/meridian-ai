import React from 'react';
import { Router, Link } from '@reach/router';
import { ThemeProvider } from '@material-ui/core/styles';

import { EditorPage, MainPage } from './pages';
import './App.scss';
import { defaultTheme } from './theme';

const Welcome = () => {
  return (
    <div>
      <p>Tutaj powstaje główny interfejs aplikacji. 
        Jeśli chcesz odwiedzić stary testowy interfejs, przejdź pod ten adres: 
        <a href="/editor">http://localhost:3000/editor</a>.
      </p>
    </div>
  );
}

function App({ voices }) {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Router style={{ height: '100%' }}>
          <MainPage path="/" />
          <EditorPage path="/editor" />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
