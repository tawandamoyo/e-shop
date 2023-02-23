import React, {useState, useEffect} from "react";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Product from "../components/Product";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      getProducts();
  },[]);

  async function getProducts() {
      const products = await axios.get('/items');
      setProducts(products.data);
  }

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
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {products.map((product, index) => (
                  <Grid xs={2} sm={4} md={4} key={index}>
                      <Product product={product}/>
                  </Grid>
                ))}
              </Grid>
            </Box> 
        </>
    )
};

export default Home;