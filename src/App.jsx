import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import UserProfile from "./pages/UserProfile";
<<<<<<< Updated upstream
=======
import NavigationBar from "./components/NavigationBar";
import BookSearch from "./components/BookSearch";
import SearchPage from "./pages/SearchPage";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/user/:userName" element={<UserProfile />} />
<<<<<<< Updated upstream
=======
        <Route path="/book" element={<BookSearch />} />
        <Route path="/nav" element={<NavigationBar />} />
        <Route path="/search" element={<SearchPage />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
