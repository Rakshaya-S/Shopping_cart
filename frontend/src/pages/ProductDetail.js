import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetail(props) {
    const [product, setProduct] = useState(null);
    const [qty, setqty] = useState(1);
    const { id } = useParams()
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/products/" + id)
            .then(res => res.json())
            .then(res => setProduct(res.data[0]))
    }, [id]);
    function addToCart() {
        const existItem = props.cartItems.find((items) => {
            return items.product.id == product.id
        })
        if (!existItem) {
            const newitem = { product, qty };
            props.setCartItems((prev) => [...prev, newitem])
            toast.success("Cart item added successfully!")
        }
    }
    function increaseQyt(){
        if(product.stock>qty){
            setqty((prevQty) => prevQty + 1);
        }
    }
    function decreaseQyt(){
        if(qty>1){
            setqty((prevQty) => prevQty -1);
        }
    }
    return product && <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.images[0].image} alt="sdf" height="500" width="500" />
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">{product.id}</p>

                <hr />

                <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${product.rating / 5 * 100}%` }}></div>
                </div>

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQyt}>-</span>

                    <input type="number" class="form-control count d-inline" value={qty} readOnly />

                    <span class="btn btn-primary plus" onClick={increaseQyt}>+</span>
                </div>
                <button type="button" id="cart_btn" onClick={addToCart} disabled={product.stock==0} class="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr />

                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? `In Stock` : `Out of stock`}</span></p>

                <hr />

                <h4 class="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                <div class="rating w-50"></div>

            </div>

        </div>

    </div>
}

export default ProductDetail;