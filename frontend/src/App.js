import React, { useState } from 'react';
import './App.css';
import News from './components/news';
import Navbar from './components/navbar';
import SignIn from './components/sign';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? (
        <div className='Home'>
          <Navbar />
        <div className="News-container">
          <News />
        </div>
        </div>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </div>
  );
}

export default App;