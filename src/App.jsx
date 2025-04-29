import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./contexts/userContext"; // ✅ import context
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import UserProfile from "./pages/UserProfile";
import NavigationBar from "./components/NavigationBar";
import BookSearch from "./components/BookSearch";
import SignUp from "./pages/SignUp";
import SearchPage from "./pages/SearchPage";
import BrowseBooks from "./pages/Browse";
import SignIn from "./pages/SignIn";

function AppLayout() {
  const location = useLocation();
  const hideNavbar = ["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<BrowseBooks />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/user/:userName" element={<UserProfile />} />
        <Route path="/book" element={<BookSearch />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppLayout />
      </Router>
    </UserProvider>
  );
}

export default App;
