const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. Database Connection (MongoDB)
// FIX: Replaced '@' in password with '%40' and added '/bookstore'
mongoose
  .connect(
    "mongodb+srv://atharvabhakre2005_db_user:6pzVRl2qBPCSgePl@cluster0.tdrfsew.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB Atlas Successfully"))
  .catch((err) => console.log("Connection Error:", err));

// 2. Database Schema (User)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: String,
  price: { type: Number, required: true },
  stock: Number,
  image: String,
});
const Book = mongoose.model("Book", bookSchema);

// 3. API Routes

// Registration Endpoint
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration Failed" });
  }
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: "Login Successful", user: user.username });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login Error" });
  }
});

// Catalogue Endpoint - Get all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Add new book
app.post("/api/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Update book
app.put("/api/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Delete book
app.delete("/api/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
