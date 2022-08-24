# GraphQL Federation
This reposotory represents my learning abount GraphQL Federation with Apollo.

### Books API `./server-one`
#### typeDefs definitions 
```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.0"
    import: ["@key", "@external"]
  )

type Book @key(fields: "authorId") {
  title: String
  authorId: Int
  author: Author
}

extend type Author @key(fields: "id") {
  id: ID! @external
}

type Query {
  books: [Book]
}
```

#### Resolvers
```javascript
Query: {
  books: () => books,
},
Book: {
  author: (book) => {
    return { __typename: "Author", id: book.authorId };
  },
}
```

### Author API `./server-two`
#### typeDefs definitions 
```graphql
extend schema
extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

type Author @key(fields: "id") {
  id: ID!
  name: String
}

type Query {
  authors: [Author]
}
```

#### Resolvers
```javascript
Query: {
  authors: () => authors,
},
Author: {
  __resolveReference(object) {
    return authors.find((user) => user.id == object.id);
  },
},
```

### API Gateway `./gateway`
#### Calls
Books query
```graphql
query BooksQuery {
  books {
    title
    authorId
  }
}
```
Author query
```graphql
query AuthorQuery {
  authors {
    id
    name
  }
}
```
Books with author query
```graphql
query BooksWithAuthorQuery {
  books {
    title
    authorId
    author {
      id
      name
    }
  }
}
```

#### Comands
- Start all services and API's
```bash
yarn start
```
- Start ONLY Books API
```bash
yarn start:one
```
- Start ONLY Author API
```bash
yarn start:two
```








