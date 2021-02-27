import React from 'react';
import { Router, Link } from '@reach/router';

import { EditorPage } from './pages';
import './App.scss';

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
      <Router style={{ height: '100%' }}>
        <Welcome path="/" />
        <EditorPage path="/editor" />
      </Router>
    </div>
  );
}

export default App;
