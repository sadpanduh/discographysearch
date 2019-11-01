import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Search from './components/search/search.component';
import AlbumCollection from './components/album-collection/album-collection.component';

import './App.css';

const App = () => {
  const [artist, setArtist] = useState('Kanye West');
  const [search, setSearch] = useState('Kanye West');
  let albumIDSet = new Set();

  // useEffect(()=>{
  //   axios.get(`/search/${search}`
  //   ).then(response => {
  //     let albums = response.data.data;
  //     parseUniqueAlbumIDs(albums);
  //     alert("success, check console");
  //   }).catch(error => {
  //     console.log('There was an error: ', error);
  //     alert('error, check console');
  //   });
  // }, [search]);

  function parseUniqueAlbumIDs(albums){
    albums.forEach(album => {
      albumIDSet.add(album.id);
    })

    console.log(albumIDSet);
  }

  const handleChange = (event) => {
    setArtist(event.target.value);
  }

  const handleSubmit = (event) => {
    setSearch(artist);
  }

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        <Search placeholder={artist} handleChange={handleChange} />
      </form>
      <AlbumCollection />
      <Footer />
    </div>
  )

}

export default App;
