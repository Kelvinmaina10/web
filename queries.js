// -----------------------------
// 📚 Task 2: Basic CRUD Queries
// -----------------------------

// 1. Find all books in a specific genre
db.books.find({ genre: "Programming" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } });

// 3. Find books by a specific author
db.books.find({ author: "Robert C. Martin" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "Clean Code" },
  { $set: { price: 42.00 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Art of War" });


// --------------------------------
// 🔍 Task 3: Advanced Querying
// --------------------------------

// 6. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// 7. Projection: return only title, author, and price
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
);

// 8. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination: page 1 (first 5 books)
db.books.find().limit(5).skip(0);

// 11. Pagination: page 2 (next 5 books)
db.books.find().limit(5).skip(5);


// ------------------------------------------
// 🧮 Task 4: Aggregation Pipeline Operations
// ------------------------------------------

// 12. Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  }
]);

// 13. Find the author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      book_count: { $sum: 1 }
    }
  },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
]);

// 14. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  }
]);


// -----------------------------
// ⚡ Task 5: Indexing
// -----------------------------

// 15. Create an index on the title field
db.books.createIndex({ title: 1 });

// 16. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 17. Use explain() to show performance improvement
db.books.find({ title: "Clean Code" }).explain("executionStats");
