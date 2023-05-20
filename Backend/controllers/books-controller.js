const Book = require("../model/Book");
const User = require("../model/User");

const getAllBooks = async (req, res, next) => {
  const nrksiazki = req.query.q;
  const catName = req.query.cat;
  let books;
  try {
    if (nrksiazki) {
      books = await Book.find({price: nrksiazki});
      
  }else if(catName){
      books = await Book.find({
        categories:{
          $in:[catName],
        },
      } );
      
       }else{
    books = await Book.find();
      }
      
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "Brak książek" });
  }
  return res.status(200).json({ books });
};
// wyszukuję nrksiązki
const getAllBooks1 = async (req, res, next) => {
  const nrksiazki = req.query.q;

  let books;
  try {
    if (nrksiazki) {
      books = await Book.find({price: nrksiazki});
       
       }else{
    books = await Book.find();
      }
      
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "Brak książek" });
  }
  return res.status(200).json({ books });
};

// wyszukuję tytuł
const getAllBooks2 = async (req, res, next) => {
  const tytul = req.query.q;

  let books;
  try {
    if (tytul) {
      books = await Book.find({name: {$regex: tytul} });
       
       }else{
    books = await Book.find();
      }
      
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "Brak książek" });
  }
  return res.status(200).json({ books });
};

/* const getAllBooks = async (req, res, next) => {
   const queryName = req.query.q;
  const catName = req.query.cat;
 
  try {
    let books;
    if (queryName) {
      books = await Book.find({ queryName });
    } else if (catName) {
      books = await Book.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      books = await Book.find();
    }
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
};
*/

const countByCategory = async (req, res, next) => {

  const category = req.query.categories.split(",")
  try{
    const list = await Promise.all(category.map(categories=>{
      return Book.countDocuments({categories})
     } ))
     res.status(200).json(list)
    }catch(err){
      next(err)
     }
  }

  const countByAuthor = async (req, res, next) => {

    const category = req.query.author.split(",")
    try{
      const list = await Promise.all(category.map(author=>{
        return Book.countDocuments({author})
       } ))
       res.status(200).json(list)
      }catch(err){
        next(err)
       }
    }


    const countByBooks = async (req, res, next) => {

      try {
        const hotelCount = await Book.countDocuments({ type: "name" });
    
     res.status(200).json([
          { type: "name", count: hotelCount },
         
        ]);
      } catch (err) {
        next(err);
      }
    };
    


const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image, categories} = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
      image,
      categories,
      
     
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ book });
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image, categories} = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
      categories,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};






const addLike = async (req, res, next) => {
  try {
    const post = await Book.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const takeReaders =  async (req, res, next) => {
  try {
    const { likes} = req.body;
    const currentUser = await User.findById(req.params.id);
    let users;
     users = await User.findById(req.params.id);
    const userPosts = await Book.find({likes : users.id  });


   // const category = req.query.author.split(",")
    //try{
     // const list = await Promise.all(category.map(author=>{
     //   return User.countDocuments({author})
     //  } ))

     const lubie = await Promise.all(
      currentUser.likes.map((item) => {
        return Book.find({ userId: item});
      })
    );
  
    res.status(200).json(userPosts);
    //res.status(200).json(userPosts.concat(users));
  } catch (err) {
    res.status(500).json(err);
  }
};



const findBooks = async (req, res, next) => {

  try {
    const hotel = await Book.findById(req.params.id);
    const list = await Promise.all(
      hotel.name.map((room) => {
        return User.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

exports.findBooks = findBooks;
exports.countByBooks = countByBooks;
exports.takeReaders = takeReaders;
exports.addLike = addLike;
exports.getAllBooks2 = getAllBooks2;
exports.getAllBooks1 = getAllBooks1;
exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.countByCategory = countByCategory;
exports.countByAuthor = countByAuthor;