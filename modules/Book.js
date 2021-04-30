const Book = {};

const User = require ('../models/User');

Book.getAllBooks = async (request, response) => {
  const email = request.query.email;
  await User.find ({ email}, (err, users) => {
    if (err) console.error(err);
    if (!users.length) {
      response.send('user not found');
    } else {
      const user = users[0];
      response.send(user.books);
    }
  });
};

Book.createBook = async (request, response) => {
  console.log(request.body);
  const { books, email } = request.body;
  await User.find({ email }, (err, users) => {
    if (err) console.error(err);
    if (!users.length) {
      response.send('user not found');
      return;
    }
    const user = users[0];
    const newBook = books[0];

    user.books.push(newBook);
    user.save();

    console.log(user.books);
    response.send(user.books);
  });
};

Book.deleteBook = async (request, response) => {
  const index = Number(request.params.index);
  const email = request.query.email;

  await User.find({ email }, (err, users) => {
    if (err) console.error(err);
    const user = users[0];
    const newBookArray = user.books.filter((_, i) => i !== index);
    user.books = newBookArray;
    user.save();
    response.send(user.books);
  });
};

Book.updateBook = async (request, response) => {
  const index = Number(request.params.index);
  const newBook = request.body.books[0];
  const email = request.body.email;

  console.log({ index}, {newBook}, {email}),

  await User.find({ email }, (err, users) => {

    if (err) console.error(err);

    const user = users[0];

    user.books.splice(index, 1, newBook);
    user.save();
    response.send(user.books);

  });
};

module.exports = Book;

