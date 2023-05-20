const User = require("../model/User");
const Book = require("../model/Book");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ users });
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
      return User.countDocuments({categories})
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
        return User.countDocuments({author})
       } ))
       res.status(200).json(list)
      }catch(err){
        next(err)
       }
    }

const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No User found" });
  }
  return res.status(200).json({ user });
};

const addUser = async (req, res, next) => {
  const { name, nrkarty, available} = req.body;
  let user;
  try {
    user = new User({
      name,
      nrkarty,
      available,
      
    });
    await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, nrkarty, available } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      nrkarty,
      available,
     
    });
    user = await user.save();
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ user });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};






const takeReaders =  async (req, res, next) => {
 const id = req.params.id;
  try {
   let users; 
    users = await User.findById(req.params.id);
    const userPosts = await Book.find({likes : id });
    
    


   // const category = req.query.author.split(",")
    //try{
     // const list = await Promise.all(category.map(author=>{
     //   return User.countDocuments({author})
     //  } ))

  
  
    res.status(200).json(userPosts);
    
  } catch (err) {
    res.status(500).json(err);
  }}

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


  const searchUser = async (req, res, next) => {
    const coto = req.query.q;
    const coto1 = req.query.qa;
    try {
      let szukaj;
      if(coto){
      szukaj = await User.find({name: {$regex: coto} })
      }
      else if(coto1){
        szukaj = await User.find({nrkarty: coto1}) 
      }
      else{
        szukaj = await User.find();
      }
       res.status(200).json(szukaj);
      }
    catch(err)
    {
    next(err);
    }
    }



    const searchUser1 = async (req, res, next) => {
      const coto = req.query.q;
      const coto1 = req.query.qa;
      try {
        let szukaj;
        if(coto){
        szukaj = await User.find({nrkarty: coto })
        }
        else if(coto1){
          szukaj = await User.find({nrkarty: coto1}) 
        }
        else{
          szukaj = await User.find();
        }
         res.status(200).json(szukaj);
        }
      catch(err)
      {
      next(err);
      }
      }
    //const searchUser = async (req, res, next) => {
      //const coto = req.query.q;
      //const coto1 = req.query.qr;
      //try {
        //const szukaj = coto
         //? await User.find({name: {$regex: coto} })
       //:   await User.find({nrkarty: coto1}) 
       //console.log(coto1)
          //res.status(200).json(szukaj);
        //}
      //catch(err)
      //{
      //next(err);
      //}
      //}



   // const searchUser = async (req, res, next) => {
     // const coto = req.query.q;
      //const taka = req.query.q;
      //try {
        //const szukaj = await User.find({name: {$regex: coto} })
         //res.status(200).json(szukaj);
        //}
      //catch(err)
      //{
      //next(err);
      //}
      //}

      const countByUsers = async (req, res, next) => {

  try {
    const hotelCount = await User.countDocuments({ type: "name" });

 res.status(200).json([
      { type: "name", count: hotelCount },
     
    ]);
  } catch (err) {
    next(err);
  }
};

const findUsers = async (req, res, next) => {

  try {
    const hotelCount = await User.countDocuments({ type: "name" });

 res.status(200).json([
      { type: "name", count: hotelCount },
     
    ]);
  } catch (err) {
    next(err);
  }
};

exports.findUsers = findUsers;
exports.countByUsers = countByUsers;
exports.searchUser = searchUser;
exports.searchUser1 = searchUser1;
exports.takeReaders = takeReaders;
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.countByCategory = countByCategory;
exports.countByAuthor = countByAuthor;