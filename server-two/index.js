const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

  type Author @key(fields: "id") {
    id: ID!
    name: String
  }

  type Query {
    authors: [Author]
  }
`;
const resolvers = require("./resolvers");

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002, path: "/graphql" },
  });

  console.log(`📦 Server ready at ${url}`);
}

startServer();
