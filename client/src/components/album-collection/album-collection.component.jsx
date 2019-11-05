import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AlbumCard from '../album-card/album-card.component';
import './album-collection.styles.scss';

const AlbumCollection = ({ albumIdCollection }) => {
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        //Clear the collection to add the new albums
        setCollection([]);
        
        //Retrieve Each album information based on the album id from Deezer
        albumIdCollection.forEach(albumId => {
            axios.get(`/album/${albumId}`
            ).then(response => {
                let album = response.data;
                setCollection(collection => [...collection, {
                    id: album.id,
                    img: album.cover_big,
                    title: album.title,
                    date: album.release_date,
                    type: album.record_type
                }])
            }).catch(error => {
                console.log('There was an error: ', error);
            });
        })  
    }, [albumIdCollection])

    return (
        <div className='albumcollection'>
            {
                collection.map(({ id, title, img, date, type }) => (
                    <AlbumCard key={id} albumtype={type} albumcover={img}
                        albumdate={date} albumtitle={title} />
                ))
            }
        </div>
    )
}

export default AlbumCollection;

