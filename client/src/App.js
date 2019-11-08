import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Search from './components/search/search.component';
import AlbumCollection from './components/album-collection/album-collection.component';

import './App.css';

const App = () => {
  const [artist, setArtist] = useState('Anamanaguchi');
  const [search, setSearch] = useState('Anamanaguchi');
  const [albumIds, setAlbumIds] = useState(new Set());

  const [foundArtist, setFoundArtist] = useState(true);

  //Get Information about the artist
  //First search by the artist name and retrieve the first artist id from the first returned
  //Using the artist id, retrieve all the album ids and remove any duplicate ids
  useEffect(() => {
    function fetchArtistId() {
      axios.get(`/search/artist/${search}`
      ).then(response => {

        if (response.data.total > 0) {
          let artistId = response.data.data[0].id;
          let numOfAlbums = response.data.data[0].nb_album;
          fetchAllArtistInfo(artistId, numOfAlbums);
        } else {
          //add something to do when the search result doesnt return anything back
          setFoundArtist(false);
        }

      }).catch(error => {
        console.log("Error occured while fetching initial artist data: ", error);
      });
    }

    async function fetchAllArtistInfo(artistId, numOfAlbums) {
      let arr = [];

      //looks like deezer goes in increments of 25 per returned by default 
      for (let i = 0; i <= numOfAlbums; i += 25) {
        await axios.get(`/artist/${artistId}/albums?index=${i}`
        ).then(response => {
          arr.push.apply(arr, response.data.data);
        }).catch(error => {
          console.log("Error occured while fetching collection of artist data: ", error);
        });
      }

      parseAndSetUniqueAlbumIDs(arr);
    }

    //Compile only the unique Album Ids from all the tracks recieved from the API call and set albumIds state
    function parseAndSetUniqueAlbumIDs(data) {
      let albumIDSet = new Set();
      
      console.log("parsing and setting set")
      for (let i = 0; i < data.length; i++) {
        albumIDSet.add(data[i].id);
      }

      setAlbumIds(albumIDSet);
    }

    fetchArtistId();
  }, [search]);
  
  const handleChange = (event) => {
    setArtist(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFoundArtist(true);
    setAlbumIds(new Set());
    setSearch(artist);
  }

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        <Search placeholder={artist} handleChange={handleChange} />
      </form>
        {
          foundArtist ? (
            <AlbumCollection albumIdCollection={albumIds}/>
          ) : (
            <h3>"{search}"" was not found! Please check the spelling or try a new artist</h3>
        )}
      <Footer />
    </div>
  )

}

export default App;
