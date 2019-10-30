import React from 'react';

import icon from '../../assets/recordicon.png'; 

import './header.styles.scss';

const Header = () => (
    <div className='header'>
        <div className='title'>
            <img className='record-img' src={icon} alt='icon'/>
            <div className='title-text'>Discography Search</div>
        </div>
        <div className='links'>
            <a className='linkedin' href='https://www.linkedin.com/in/soanthony/'>LinkedIn</a>
            <a className='github' href='https://github.com/sadpanduh/discographysearch'>GitHub</a>
        </div>
    </div>
)

export default Header;