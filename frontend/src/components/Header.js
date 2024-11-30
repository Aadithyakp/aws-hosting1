import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const links = [
        { 
            id:"1",
            path: "/", 
            element: "Home" 
        },
        { 
            id:"2",
            path: "/employeelist", 
            element: "Employee List"    
        },
        {   
            id:"3",
            path: "/employeelist/employeecreate ", 
            element: "Add New Employee" 
        },
        {   
            id:"4",
            path: "/employeelist/update", 
            element: "Update Employee" 
        }
    ];

    return (
        <header className="header bg-dark text-white py-3">
            <div className="container">
                <nav>
                    <ul className="nav justify-content-center">
                        {links.map((link) => (
                            <li key={link.id} className="nav-item">
                                <Link to={link.path} className="nav-link text-white">
                                    {link.element}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
