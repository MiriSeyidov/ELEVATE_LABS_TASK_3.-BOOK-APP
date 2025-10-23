const express = require("express"); // Import the Express library (express variabe holds the express module)
const app = express(); // Creates our application object (app variable holds the express application instance)
const port = 3000; // Define the port number where the server will listen

app.use(express.json()); // Middleware that reads the JSON text from the request and Converts it into a JavaScript object

let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

let nextId = 3; // Starting after your initial books

app.get("/books", (req, res) => {
  res.json(books); // Send the list of books as a JSON response
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook); // Send the newly created book as a JSON response with status 201
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author } = req.body;

  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.json(books[bookIndex]);
});

// DELETE - Remove book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({
    message: "Book deleted successfully",
    book: deletedBook,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
