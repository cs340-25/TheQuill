import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase"; // Assuming you have a firebase.js where Firebase is initialized
import { UserBookType } from '../interfaces/UserBook'; // Import the type definition file

const db = getDatabase(app);

class UserBookService {
  // Method to add a book to a user's collection using the external bookId
  static addBookToUser(userId, book) {
    // Validate book structure based on UserBookType (optional, just for structure)
    if (typeof book.id !== UserBookType.bookId || typeof book.status !== UserBookType.status) {
      console.error("Invalid book structure");
      return;
    }

    const userBookRef = ref(db, 'userBooks/' + userId + '/' + book.id);
    set(userBookRef, {
      bookId: book.id,  // External API's book ID
      status: book.status || 'reading',  // Default to "reading" if status is not provided
      addedAt: new Date().toISOString() // Current timestamp in ISO format
    }).then(() => {
      console.log('Book added successfully');
    }).catch((error) => {
      console.error('Error adding book:', error);
    });
  }

  // Other methods to update or remove books can be added here
}

export default UserBookService;
