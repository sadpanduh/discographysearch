import React, { useState } from 'react';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Search from './components/search/search.component';

import './App.css';

const App = () => {
  const [artist, setArtist] = useState('Kanye West');


  const handleChange = (event) => {
    setArtist(event.target.value);
  }

  const handleSubmit = (event) => {
    alert(artist);
    event.preventDefault();
  }

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        <Search placeholder={artist} handleChange={handleChange} />
      </form>
      <Footer />
    </div>
  )

}

export default App;
