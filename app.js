const express = require("express"); // Import the Express library (express variabe holds the express module)
const app = express(); // Creates our application object (app variable holds the express application instance)
const port = 3000; // Define the port number where the server will listen

app.use(express.json()); // Middleware that reads the JSON text from the request and Converts it into a JavaScript object

let books = [  // In-memory array to store books
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

let nextId = 3; // Starting after your initial books

app.get("/books", (req, res) => {
  res.json(books); // Send the list of books as a JSON response
});

app.post("/books", (req, res) => { // Create a new book
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = { // Create a new book object
    id: nextId++,  // Assign a unique ID and increment the counter
    title,
    author,
  };
  books.push(newBook);  // Add the new book to the in-memory array
  res.status(201).json(newBook); // Send the newly created book as a JSON response with status 201
});

app.put("/books/:id", (req, res) => {  // Update book by ID
  const bookId = parseInt(req.params.id); // Extract book ID from URL parameters
  const bookIndex = books.findIndex((book) => book.id === bookId);  // Find the index of the book in the array

  if (bookIndex === -1) {  // If book not found, return 404
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author } = req.body;  // Extract updated data from request body

  if (title) books[bookIndex].title = title;  // Update title if provided
  if (author) books[bookIndex].author = author;  // Update author if provided

  res.json(books[bookIndex]);  // Send the updated book as a JSON response
});

// DELETE - Remove book by ID
app.delete("/books/:id", (req, res) => {  // Delete book by ID
  const bookId = parseInt(req.params.id);  // Extract book ID from URL parameters
  const bookIndex = books.findIndex((book) => book.id === bookId); // Find the index of the book in the array

  if (bookIndex === -1) {  // If book not found, return 404
    return res.status(404).json({ error: "Book not found" });  // Send 404 response
  }

  const deletedBook = books.splice(bookIndex, 1)[0];  // Remove the book from the array and store it
  res.json({  // Send a success message with the deleted book
    message: "Book deleted successfully",  // Success message
    book: deletedBook,  // The deleted book object
  });
});

// Start server
app.listen(port, () => {  // Start the server and listen on the defined port
  console.log(`Server running on http://localhost:${port}`);  // Log a message indicating the server is running
});
