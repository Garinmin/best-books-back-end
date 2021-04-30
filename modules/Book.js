const Book = {};

const User = require ('../models/User');

Book.getAllBooks = async (request, response) => {
  const email = request.qyery.email;
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
  const { newBook, email } = request.body;
  await User.find({ email }, (err, users) => {
    if (err) console.error(err);
    if (!users.length) {
      response.send('user not found');
      return;
    }
    const user = users[0];
    user.gifts.push(newBook);
    user.save();
    response.send(user.books);
  });
};

Book.deleteBook = async (request, response) => {
  const index = Number(request.params.index);
  const email = request.query.email;

  await User.find({ email }, (err, users) => {
    if (err) console.error(err);
    const user = users[0];
    const newBookArray = user.bookss.filter((_, i) => i !== index);
    user.bookss = newBookArray;
    user.save();
    response.send('success!');
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

