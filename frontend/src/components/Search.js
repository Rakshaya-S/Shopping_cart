import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    function searchHandler() {
        if (keyword.trim() !== "") {
            navigate("/search?keyword=" + encodeURIComponent(keyword));
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            searchHandler();
        }
    }

    return (
        <div className="input-group">
            <input
                type="text"
                id="search_field"
                className="form-control"
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
                <button onClick={searchHandler} id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}

export default Search;
