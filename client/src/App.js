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
  const [albumIds, setAlbumIds] = useState(new Set());

  const [totalArtistData, setTotalArtistData] = useState();

  //Get Information about the artist
  //More specifically the total number of tracks, since the Deezer API only returns 25 by default
  //Then use that total to gather all of the info by setting the Limit in the API call to the total number we recieved
  useEffect(() => {
    async function fetchArtistData(){
      try{
        const response = await fetch(`/search/${search}`);
        const data = await response.json();
        console.log(data);
        setTotalArtistData(data.total);

      }catch (error){
        console.log("Error occured while fetching initial artist data: ", error);
      }
    }

    fetchArtistData();
  }, [search]);

  useEffect(() => {
    async function fetchAllArtistInfo() {
      try{
        const response = await axios.get(`/search/${search}/${totalArtistData}`);
        setAlbumIds(parseUniqueAlbumIDs(response.data.data));
      }catch (error){
        console.log("Error occured while fetching collection of artist data: ", error);
      }
    }

    fetchAllArtistInfo();
  }, [totalArtistData])

  //Compile only the unique Album Ids from all the tracks recieved from the API call
  function parseUniqueAlbumIDs(data) {
    let albumIDSet = new Set();

    for (let i = 0; i < data.length; i++) {
      let artist = data[i].artist.name.toUpperCase();
      let albumId = data[i].album.id;

      if (artist === search.toUpperCase()) {
        albumIDSet.add(albumId);
      }
    }

    return albumIDSet;
  }

  const handleChange = (event) => {
    setArtist(event.target.value);
  }

  const handleSubmit = (event) => {
    setSearch(artist);
    event.preventDefault();
  }

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        <Search placeholder={artist} handleChange={handleChange} />
      </form>
      <AlbumCollection albumIdCollection={albumIds} />
      <Footer />
    </div>
  )

}

export default App;
