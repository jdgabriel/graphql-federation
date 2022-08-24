const books = [
  {
    title: "The Awakening",
    authorId: 1,
  },
  {
    title: "City of Glass",
    authorId: 2,
  },
];

module.exports = {
  Query: {
    books: () => books,
  },
  Book: {
    author: (book) => {
      return { __typename: "Author", id: book.authorId };
    },
  },
};
