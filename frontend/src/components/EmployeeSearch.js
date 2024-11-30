import React, { useState } from "react";

const EmployeeSearch = ({ handleSearch }) => {
    const [text, setText] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSearch(text);
    };

    return (
        <div className="d-flex justify-content-center mt-4 mb-3">
            <div className="col-6 col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by First name"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button type="submit" className="btn btn-dark text-white">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeSearch;
