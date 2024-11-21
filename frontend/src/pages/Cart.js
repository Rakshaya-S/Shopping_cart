import { useState } from "react";
import { json, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Cart(props) {
    const [complete, setcomplete] = useState(false)
    function increaseQyt(item) {
        if (item.product.stock > item.qty) {
            const newItem = props.cartItems.map((i) => {
                if (i.product.id == item.product.id) {
                    i.qty++;
                }
                return i;
            })
            props.setCartItems(newItem);
        }
    }
    function decreaseQyt(item) {
        if (item.qty > 1) {
            const newItem = props.cartItems.map((i) => {
                if (i.product.id == item.product.id) {
                    i.qty--;
                }
                return i;
            })
            props.setCartItems(newItem);
        }
    }
    function removeItemCart(item) {
        const newItem = props.cartItems.filter((i) => {
            if (i.product.id !== item.product.id) {
                return true;
            }
        })
        props.setCartItems(newItem);
    }
    function placeOrder() {
        fetch(process.env.REACT_APP_API_URL+ "/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(props.cartItems)
        }).
            then(() => {
                props.setCartItems([]);
                setcomplete(true);
                toast.success("Order Success!")
            })
    }
    return (
        props.cartItems.length > 0 ? <>
            <div className="container container-fluid">
                <h2 className="mt-5">Your Cart: <b>{props.cartItems.length}</b></h2>

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {props.cartItems.map((items) => (
                            <>
                                {console.log(items)}

                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={items.product.images[0].image} alt={items.product.name} height="90" width="115" />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={"/product/" + items.product.id} ><a href="#">{items.product.name}</a></Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${items.product.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decreaseQyt(items)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={items.qty} readOnly />

                                                <span className="btn btn-primary plus" onClick={() => increaseQyt(items)}>+</span>
                                            </div>
                                        </div>
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" onClick={() => removeItemCart(items)} className="fa fa-trash btn btn-danger"></i>
                                        </div>

                                    </div>
                                </div>
                            </>
                        ))}

                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{props.cartItems.reduce((acc, item) => (acc + item.qty), 0)}</span></p>
                            <p>Est. total: <span className="order-summary-values">${Number(props.cartItems.reduce((acc, item) => (acc + (item.product.price * item.qty)), 0)).toFixed(2)}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </> : 
        (!complete ? <h2 className="mt-2">Your Cart is empty</h2> :
        <><h2 className="mt-2">Your Order has been placed successfully</h2></>
        )
    )
}
export default Cart;