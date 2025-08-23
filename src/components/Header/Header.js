import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(location.pathname.substring(1, location.pathname.length))
    if (location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        if (location.pathname === '/home') {
            return (
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.clear();
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-dark bg-white py-3 border-b-[1px] border-solid border-b-gray-300 shadow-[0px_0px_0.5px_0.5px_rgba(0,0,0,0.1)]">
            <div className="w-100 flex justify-center pl-3 text-gray-600 font-avenir-condensed">
                <a href="/locations">
                    <img
                        src="https://cloudbackend.scdn7.secure.raxcdn.com/img/upload/oilchangers-big2x.png"
                        height="40"
                        width="272"
                        alt="Oil Changers Logo"
                    />
                </a>
            </div>
        </nav>
    )
}
export default Header;