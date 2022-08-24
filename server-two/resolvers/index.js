const authors = [
  {
    name: "Jhon",
    id: 1,
  },
  {
    name: "Doe",
    id: 2,
  },
];

module.exports = {
  Query: {
    authors: () => authors,
  },

  Author: {
    __resolveReference: (object) => {
      return authors.find((user) => user.id == object.id);
    },
    books: (author) => {
      return { __typename: "BookList", authorId: author.id };
    },
  },
};
