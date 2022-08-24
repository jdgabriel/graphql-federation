const { ApolloServer } = require("@apollo/server");
const { gql } = require("apollo-server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { buildSubgraphSchema } = require("@apollo/subgraph");

const typeDefs = gql`
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
`;
const resolvers = require("./resolvers");

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001, path: "/graphql" },
  });

  console.log(`📦 Server ready at ${url}`);
}

startServer();
