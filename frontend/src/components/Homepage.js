import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
    const navigate = useNavigate();

    const handleEmployeeListNavigation = () => {
        navigate("/employeelist");
    };

    return (
        <div>
            {/* Banner Section */}
            <div
                className="banner position-relative"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '50vh',
                }}
            >
                {/* Black overlay with fade effect */}
                <div
                    className="overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% opacity
                        zIndex: 1,
                    }}
                ></div>

                {/* Text content */}
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        position: 'relative',
                        color: 'white',
                        zIndex: 2,
                        height: '100%',
                        textAlign: 'center',
                    }}
                >
                    <h1>Welcome to the Employee Portal</h1>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="container mt-5 text-center">
                <h2>Manage Your Employees Efficiently</h2>
                <p>Click the button below to view the list of employees and manage them.</p>
                <button className="btn btn-dark" onClick={handleEmployeeListNavigation}>Go to Employee List</button>
            </div>
        </div>
    );
};

export default Homepage;
