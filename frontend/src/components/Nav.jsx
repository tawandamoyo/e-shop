import React from 'react';
import { useNavigate } from 'react-router-dom';


import './Nav.css'

function Nav(props) {
    const { path, label } = props;
    const navigate = useNavigate();

    function goToPath() {
        navigate(path);
    }
   
    return (
        <div className='nav'>
            <ul>
                <li onClick={goToPath}>{label}</li>
                <li onClick={navigate('/contact')}>Contact</li>
            </ul>
        </div>
    )
}

export default Nav;