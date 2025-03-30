import BookSearch from "./BookSearch";
import { Link } from "react-router-dom"

function NavBar() {

    return(
        <nav className="navbar">

            <div className="navbar-name">
            GreatReads
            </div>

            <div className="navbar-search">
                <BookSearch />
            </div>
            
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/my-books">My Books</Link></li>
                <li><Link to="/ friends">friends</Link></li>
            </ul>
            
        </nav>

    );
}

export default NavBar