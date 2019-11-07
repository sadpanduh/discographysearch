import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AlbumCard from '../album-card/album-card.component';
import './album-collection.styles.scss';

const AlbumCollection = ({ albumIdCollection }) => {
    const [collections, setCollections] = useState([]);
    const [uniqueCollections, setUniqueCollections] = useState([]);

    useEffect(() => {
        //Retrieve Each album information based on the album id from Deezer API
        function getAlbums() {
            console.log("getting and setting album collection")
            
            albumIdCollection.forEach(async albumId => {
                await axios.get(`/album/${albumId}`
                ).then(response => {
                    let album = response.data;

                    //prevent creating blank cards
                    if (album.title) {
                        setCollections(oldCollection => [...oldCollection, {
                            id: album.id,
                            img: album.cover_big,
                            title: album.title,
                            date: album.release_date,
                            type: album.record_type,
                            sortdate: album.release_date.replace(/-/g, '')
                        }]);
                    }

                }).catch(error => {
                    console.log('There was an error: ', error);
                });
            });
        }

        console.log("clearing collections");
        //Clear the collection to add the new albums
        setCollections([]);

        getAlbums();
    }, [albumIdCollection])

    useEffect(() => {
        const uniqueAlbums = collections.filter((collection, index, self) =>
            index === self.findIndex(t => (
                t.title === collection.title
            ))
        )
        
        setUniqueCollections(uniqueAlbums);
    }, [collections])

    return (
        <div className='albumcollection'>
            {
                //display albums by newest date
                uniqueCollections.sort(function (a, b) { return b.sortdate - a.sortdate }).map(collection => (
                    <AlbumCard key={collection.id} albumtype={collection.type} albumcover={collection.img}
                        albumdate={collection.date} albumtitle={collection.title} />
                ))
            }
        </div>
    )
}

export default AlbumCollection;

