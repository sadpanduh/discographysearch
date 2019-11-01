import React from 'react';

import AlbumCard from '../album-card/album-card.component';
import './album-collection.styles.scss';
import TEST_DATA from './test.data';

const AlbumCollection = () => {
    let collection = TEST_DATA;
    return(
        <div className='albumcollection'>
            {
                collection.map(({title, img, date, type}) => (
                    <AlbumCard albumtype={type} albumcover={img}
                    albumdate={date} albumtitle={title} />
                ))
            }
        </div>
    )
}

export default AlbumCollection;

