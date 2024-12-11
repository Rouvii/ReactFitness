import { useLocation } from "react-router-dom";

const Error404Page=()=> {
    const location = useLocation();
    return ( <div>
        <h1>404 Error</h1>
        <p>Page not found at {location.pathname}</p>
    </div> );
}

export default Error404Page;