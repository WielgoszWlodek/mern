const express = require("express");
const router = express.Router();
const Book = require("../model/Book");
const booksController = require("../controllers/books-controller");




router.get("/timeline/:id", booksController.takeReaders);
router.put("/:id/like", booksController.addLike);
router.get("/", booksController.getAllBooks);
router.get("/", booksController.getAllBooks1);
router.get("/tytul", booksController.getAllBooks2);
router.post("/", booksController.addBook);
router.get("/:id", booksController.getById);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);
router.get("/find/countByCategory", booksController.countByCategory);
router.get("/find/countByAuthor", booksController.countByAuthor);
router.get("/find/countByBooks", booksController.countByBooks);
router.get("/find/findBooks/:id", booksController.findBooks);

module.exports = router;
