import { Link } from "react-router-dom";
import Search from "./Search";

function Header(props) {
    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/" style={{ textDecoration: "none" }}><h1 style={{color:"white"}}>Shopsy</h1></Link>
                </div>
            </div>
            <div className="col-12 col-md-6 mt-2 mt-md-0">

                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/cart">
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">{props.cartItems.length}</span>
                </Link>
            </div>
        </nav>
    )
}

export default Header;