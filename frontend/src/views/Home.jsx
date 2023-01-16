import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Home() {
    return (
        <>
            <GoogleLogin
              onSuccess={ async (credentialResponse) => {
                await axios.post('/login', credentialResponse)
                }
              }
              onError={() => {
                console.log('login failed');
              }}
            />
            <button onClick={ async () => {
                await axios.get('/logout')
            }}>
                Logout
            </button>
        </>
    )
};

export default Home;