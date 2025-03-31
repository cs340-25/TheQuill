import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase"; // Assuming you have a firebase.js where Firebase is initialized
import { UserBookType } from '../interfaces/UserBook'; // Import the type definition file

const db = getDatabase(app);
  // Method to add a book to a user's collection using the external bookId
class UserBookService {
    constructor(database) {
        this.database = database; // Assuming you're passing the Firebase database instance
        this.userBooksRef = this.database.ref('userBooks'); // Path in the Firebase Realtime Database
    }

    // Method to add a new UserBook
    addUserBook(userId, userBook) {
        // Ensure the userBook object follows the defined structure
        if (
        typeof userBook.bookId === 'number' &&
        typeof userBook.onBookshelf === 'boolean' &&
        typeof userBook.isReading === 'boolean' &&
        typeof userBook.timeOfLastReadingUpdate === 'string' &&
        typeof userBook.percentageRead === 'number' &&
        typeof userBook.rating === 'number'
        ) {
        const userBookRef = this.userBooksRef.child(userId); // User-specific node
        return userBookRef.push(userBook); // Push the UserBook to the user's collection
        } else {
        throw new Error('Invalid UserBook structure');
        }
    }

    // Method to update a UserBook for a specific user and bookId
    updateUserBook(userId, bookId, updatedData) {
        const userBookRef = this.userBooksRef.child(userId);
        
        return userBookRef
        .orderByChild('bookId')
        .equalTo(bookId)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
            const bookKey = Object.keys(snapshot.val())[0]; // Get the key of the book in the database
            return userBookRef.child(bookKey).update(updatedData);
            } else {
            throw new Error('UserBook with the specified bookId not found');
            }
        });
    }

    // Method to fetch all UserBooks for a specific user
    getUserBooks(userId) {
        const userBookRef = this.userBooksRef.child(userId);
        return userBookRef.once('value').then((snapshot) => snapshot.val());
    }

    // Method to delete a UserBook (if necessary)
    deleteUserBook(userId, bookId) {
        const userBookRef = this.userBooksRef.child(userId);
        
        return userBookRef
        .orderByChild('bookId')
        .equalTo(bookId)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
            const bookKey = Object.keys(snapshot.val())[0];
            return userBookRef.child(bookKey).remove();
            } else {
            throw new Error('UserBook with the specified bookId not found');
            }
        });
    }
}



export default UserBookService;
