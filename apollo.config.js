module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "demo-shops-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};