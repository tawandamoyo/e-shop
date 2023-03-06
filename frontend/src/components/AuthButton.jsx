import React, {useState, useContext} from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { GoogleLogin } from "@react-oauth/google";
import Button from "./Button";
import axios from "axios";
import UserMenu from "./UserMenu";

export default function AuthButton() {
    const {authenticationStatus, onLogin} = useContext(AuthenticationContext);
    return (
        <>
            {authenticationStatus ? 
            <UserMenu/> :
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

