import { useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  return (
    <div>
      <nav className="nav">
      <h1 className="logo">📚 Book Finder</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
    </div>
  );
}

export default BookDetails;
