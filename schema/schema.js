const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = graphql;

const ImageType = new GraphQLObjectType({
  name: "Image",
  fields: {
    source: { type: GraphQLString },
    license: { type: GraphQLString },
    altText: { type: GraphQLString },
    image: { type: GraphQLString },
    thumbnails: { type: GraphQLString }
  }
});

const IndexType = new GraphQLObjectType({
  name: "Index",
  fields: {
    uuid: { type: GraphQLString },
    contentType: { type: ImageType },
    rendered: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
    indexedAt: { type: GraphQLString },
    details: { type: GraphQLString }
  }
});

const SearchType = new GraphQLObjectType({
  name: "Search",
  fields: {
    query: { type: GraphQLString },
    contentType: { type: new GraphQLList(GraphQLString) },
    timeAfter: { type: GraphQLString },
    timeBefore: { type: GraphQLString }
  }
});

const SearchQueryType = new GraphQLObjectType({
  name: "SearchQuery",
  fields: {
    searchTimeMsecs: { type: GraphQLInt },
    results: { type: new GraphQLList(IndexType) },
    query: {
      type: SearchType
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    index: {
      type: IndexType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/index/${args.id}`)
          .then(res => res.data);
      }
    },
    search: {
      type: SearchQueryType,
      args: { query: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/search/`).then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
