import React, {useState, useContext} from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { GoogleLogin } from "@react-oauth/google";
import Button from "./Button";
import axios from "axios";

export default function AuthButton() {
    const {authenticationStatus, onLogin, onLogout} = useContext(AuthenticationContext);
    return (
        <>
            {authenticationStatus ? 
            <Button onClick={ async () => {
                await axios.get('/logout')
                onLogout();
            }}>
                Logout
            </Button>  :
            <GoogleLogin
                onSuccess={ async (credentialResponse) => {
                  await axios.post('/login', credentialResponse)
                  onLogin();
                  }
                }
                onError={() => {
                  console.log('login failed');
                }}
                useOneTap={true}
            />}
        </>
    )
}

