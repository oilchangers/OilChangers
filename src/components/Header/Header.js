import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        if(props.location.pathname === '/home'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.clear();
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row w-100 d-flex justify-content-center text-white">
                <div className="col-7 text-right"> <span className="h3">{props.title || title}</span></div>
               <div className="col-5 text-right">
                {renderLogout()}
                </div>
            </div>
        </nav>
    )
}
export default withRouter(Header);