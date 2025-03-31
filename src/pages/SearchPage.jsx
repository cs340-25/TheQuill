// SearchPage.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import BookSearch from "../components/BookSearch";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const bookQue = searchParams.get("q") || "";

  return (
    <div className="search-page">
      <h1>Search for Books</h1>
      <BookSearch key={bookQue} BookQue={bookQue} />
    </div>
  );
};

export default SearchPage;

