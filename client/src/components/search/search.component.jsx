import React from 'react';

import './search.styles.scss';

const Search = ({placeholder, handleChange}) => (
    <div className='search'>
        <p className='search-greeting'>Search for an artist to view their discography</p>
        <input 
            className='search-box'
            type='search'
            placeholder={placeholder}
            onChange={handleChange}
        />
    </div>
)

export default Search;