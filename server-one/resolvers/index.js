const books = [
  {
    id: 1,
    title: "Book title #01",
    authorId: 1,
  },
  {
    id: 2,
    title: "Book title #02",
    authorId: 2,
  },
  {
    id: 3,
    title: "Book title #03",
    authorId: 1,
  },
  {
    id: 4,
    title: "Book title #04",
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
    __resolveReference: (object) => {
      return books.filter((book) => book.authorId == object.authorId);
    },
  },
  BookList: {
    nodes: (obj) => {
      return books.filter((book) => book.authorId == obj.authorId);
    },
  },
};
