import React from "react";
import axios from "axios";
import Button from "../components/Button";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const categories = ['uncategorised', 'electronics', 'mobile phones', 'computer accessories', 'ereaders'];


  function handleGetProductsClick() {
    navigate('/products', {replace: true})
  }
    return (
        <>
            
            {/* <div>
              {categories.map((category) => {
                return (
                 <div>
                  <img src="" alt="" />
                  <Button> {category} </Button>
                 </div>
                )
              })}
            </div> */}
            <Button onClick={handleGetProductsClick}>
              See all products
            </Button>
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