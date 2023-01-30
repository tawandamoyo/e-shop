import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound404() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/', {replace: true})
    }
    return (
        <div>
            <p>The page you are looking for was not found.</p>
            <p>Return to <Button onClick={handleClick}>Home</Button> </p>
        </div>
    )
}