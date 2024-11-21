import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

function Home() {
    const [product,setProduct]=useState([]);
    const [searchParams,setSearchParams]=useSearchParams()
    useEffect(() => {
        const queryString = searchParams.toString();
        const url = `${process.env.REACT_APP_API_URL}/products${queryString ? '?' + queryString : ''}`;
        fetch(url)
            .then(res =>  res.json())
            .then(res => setProduct(res.data))
    }, [searchParams]);
    
    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                    {product.map(p=><ProductCard product={p}/>)}
                </div>
            </section>  
        </Fragment>
    );
}

export default Home;