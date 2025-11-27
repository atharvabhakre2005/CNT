const mongoose = require("mongoose");

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  price: Number,
  stock: Number,
  image: String,
});

const Book = mongoose.model("Book", bookSchema);

// Sample books data
const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    price: 299,
    stock: 50,
    image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  },
  {
    title: "React for Beginners",
    author: "John Smith",
    isbn: "978-1234567890",
    price: 599,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=400&fit=crop",
  },
  {
    title: "Node.js Mastery",
    author: "Jane Doe",
    isbn: "978-0987654321",
    price: 699,
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=400&fit=crop",
  },
  {
    title: "Database Design",
    author: "Mike Johnson",
    isbn: "978-1122334455",
    price: 899,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=400&fit=crop",
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    isbn: "978-0596517748",
    price: 499,
    stock: 40,
    image: "https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    price: 799,
    stock: 35,
    image: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    isbn: "978-1593279288",
    price: 649,
    stock: 45,
    image: "https://covers.openlibrary.org/b/isbn/9781593279288-L.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    isbn: "978-0135957059",
    price: 999,
    stock: 28,
    image: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    isbn: "978-1593279509",
    price: 749,
    stock: 38,
    image: "https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    isbn: "978-1491904244",
    price: 549,
    stock: 42,
    image: "https://covers.openlibrary.org/b/isbn/9781491904244-L.jpg",
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    isbn: "978-0201633612",
    price: 1299,
    stock: 15,
    image: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262033848",
    price: 1899,
    stock: 12,
    image: "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg",
  },
];

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://atharvabhakre2005_db_user:6pzVRl2qBPCSgePl@cluster0.tdrfsew.mongodb.net/?appName=Cluster0"
    );

    console.log("✅ MongoDB Atlas connected");

    // Clear existing books
    await Book.deleteMany({});
    console.log("🗑️  Cleared existing books");

    // Insert sample books
    await Book.insertMany(sampleBooks);
    console.log(`✅ ${sampleBooks.length} sample books added successfully!`);

    // Display added books
    const books = await Book.find();
    console.log("\n📚 Added Books:");
    books.forEach((book, index) => {
      console.log(
        `${index + 1}. ${book.title} by ${book.author} - ₹${book.price}`
      );
    });

    console.log("\n✨ Database seeding completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
