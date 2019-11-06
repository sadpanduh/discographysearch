import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AlbumCard from '../album-card/album-card.component';
import './album-collection.styles.scss';

const AlbumCollection = ({ albumIdCollection }) => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        //Clear the collection to add the new albums
        setCollections([]);

        //Retrieve Each album information based on the album id from Deezer
        albumIdCollection.forEach(albumId => {
            axios.get(`/album/${albumId}`
            ).then(response => {
                let album = response.data;

                setCollections(collections => [...collections, {
                    id: album.id,
                    img: album.cover_big,
                    title: album.title,
                    date: album.release_date,
                    type: album.record_type
                }]);
            }).catch(error => {
                console.log('There was an error: ', error);
            });
        })
    }, [albumIdCollection])

    return (
        <div className='albumcollection'>
            {
                collections.map( collection => (
                    <AlbumCard key={collection.id} albumtype={collection.type} albumcover={collection.img}
                        albumdate={collection.date} albumtitle={collection.title} />
                ))
            }
        </div>
    )
}

export default AlbumCollection;

