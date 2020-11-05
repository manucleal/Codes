// System
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    
    const location = useLocation();
    const [ activeMenu, setActiveMenu ] = useState(location.pathname);

    return (
        <div className="wrapper d-flex align-items-stretch">
            <nav id="my-sidebar">
                <div className="p-4 pt-5">
                    <img className="img logo mb-5" src="./images/people.png" alt="logo" />
                    <ul className="list-unstyled components mb-5">
                        <li className={ activeMenu === '/' ? 'active' : '' }>
                            <Link 
                                to="/"
                                onClick={ () => { setActiveMenu('/') } }
                            > 
                            Home 
                            </Link>
                        </li>
                        <li className={ activeMenu === '/client' ? 'active' : '' }>
                            <Link 
                                to="/client"                                
                                onClick={ () => { setActiveMenu('/client') } }
                            > 
                            Clients 
                            </Link>
                        </li>
                        <li className={ activeMenu === '/venue' ? 'active' : '' }>
                            <Link 
                                to="/venue"
                                onClick={ () => { setActiveMenu('/venue') } }
                            > 
                            Venues 
                            </Link>                            
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;