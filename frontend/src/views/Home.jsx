import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import Button from "../components/Button";
import ProductForm from "./ProductForm";

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
            <Button onClick={ async () => {
                await axios.get('/logout')
            }}>
                Logout
            </Button>
            <div>
             {/* <Button>
              Upload New Product
             </Button> */}
             <ProductForm>
              
             </ProductForm>
            </div>
            

        </>
    )
};

export default Home;