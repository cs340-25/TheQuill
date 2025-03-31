import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import UserProfile from "./pages/UserProfile";
import NavigationBar from "./components/NavigationBar";
import BookSearch from "./components/BookSearch";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/user/:userName" element={<UserProfile />} />
        <Route path="/book" element={<BookSearch />} />
        <Route path="/nav" element={<NavigationBar />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
