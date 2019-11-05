import React from 'react';

import './album-card.styles.scss';

const AlbumCard = ({albumcover, albumtype, albumtitle, albumdate}) =>(
    <div className='albumcard'>
        <img className='albumcover' src={albumcover} alt=""/>
        <div className='albuminfo'>
            <div className='albumtitle'>{albumtitle}</div>
            <div className='albumtype'>Type: {albumtype}</div>
            <div className='albumdate'>Released:{albumdate}</div>
        </div>
    </div>
)

export default AlbumCard;