import {Link} from "react-router-dom"


function ProductCard(props) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={props.product.images[0].image}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                    <Link to={"/product/"+props.product.id} >{props.product.name}</Link>
                    </h5>
                    <div class="ratings mt-auto">
                        <div class="rating-outer">
                            <div class="rating-inner" style={{width:`${props.product.rating/5 * 100}%`}}></div>
                        </div>
                    </div>
                    <p className="card-text">${props.product.price}</p>
                    <Link to={"/product/"+props.product.id} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}


export default ProductCard;