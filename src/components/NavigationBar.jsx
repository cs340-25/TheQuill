import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';


function NavigationBar() {
  const [miniQuery, setMiniQuery] = useState("");
  const navigate = useNavigate();

  const handleMiniSearch = (e) => {
    e.preventDefault();
    console.log("Navigating with query:", miniQuery);
    navigate(`/search?q=${encodeURIComponent(miniQuery)}`);
  };

  return (
    <nav className="navbar">

      <div className="navbar-name">
        GreatReads
      </div>

      <div className="navbar-search">
        <form onSubmit={handleMiniSearch}>
          <input
            type="text"
            placeholder="Search books..."
            value={miniQuery}
            onChange={(e) => setMiniQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
       </div>

       <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-books">My Books</Link></li>
        <li><Link to="/friends">Friends</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;

