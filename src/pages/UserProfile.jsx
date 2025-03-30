import React from "react";

const UserProfile = () => {
    // Sample user data (Replace this with dynamic data from Firebase)
    const user = {
        profilePic: "https://via.placeholder.com/150", // Replace with actual image URL
        name: "Jane Doe",
        booksReadThisYear: 15,
        tags: ["Fantasy Lover", "Sci-Fi Enthusiast", "Book Reviewer"],
        bookshelf: [
            {
                id: 1,
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                cover: "https://covers.openlibrary.org/b/id/6979862-L.jpg",
            },
            {
                id: 2,
                title: "Dune",
                author: "Frank Herbert",
                cover: "https://covers.openlibrary.org/b/id/8378116-L.jpg",
            },
            {
                id: 3,
                title: "Pride and Prejudice",
                author: "Jane Austen",
                cover: "https://covers.openlibrary.org/b/id/10546650-L.jpg",
            },
            // Add more books here
        ],
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Profile Section */}
            <div className="flex flex-col items-center">
                <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-300"
                />
                <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
                <p className="text-gray-600">Books Read This Year: {user.booksReadThisYear}</p>

                {/* Tags Section */}
                <div className="flex flex-wrap justify-center mt-2">
                    {user.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="m-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bookshelf Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">My Bookshelf</h3>
                <div className="overflow-x-auto whitespace-nowrap mt-3">
                    <div className="flex space-x-4">
                        {user.bookshelf.map((book) => (
                            <div key={book.id} className="flex flex-col items-center min-w-[150px]">
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="w-24 h-36 object-cover rounded-md shadow-md"
                                />
                                <p className="text-sm font-medium mt-1 text-center">{book.title}</p>
                                <p className="text-xs text-gray-500">{book.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
