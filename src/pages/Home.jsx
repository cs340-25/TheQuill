import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to BookTracker</h1>
      <Link to="/book/1">Go to Book 1</Link>
    </div>
  );
}

export default Home;
