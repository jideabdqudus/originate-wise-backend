const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");

//Plan Type
const PlansType = new GraphQLObjectType({
  name: "Plans",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    amount: { type: GraphQLInt },
    date: { type: GraphQLString },
  }),
});

//User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    plan: {
      type: PlansType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:6000/plans/" + args.id)
          .then((res) => res.data);
      },
    },
    plans: {
      type: new GraphQLList(PlansType),
      resolve(parentValue, args) {
        return axios.get("http://localhost:6000/plans").then((res) => res.data);
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:6000/users/" + args.id)
          .then((res) => res.data);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:6000/users/")
          .then((res) => res.data);
      },
    },
  },
});

// Mutations

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlan: {
      type: PlansType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:6000/plans", {
            title: args.title,
            amount: args.amount,
            date: args.date,
          })
          .then((res) => res.data);
      },
    },
    deletePlan: {
      type: PlansType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://localhost:6000/plans/" + args.id)
          .then((res) => res.data);
      },
    },
    updatePlan: {
      type: PlansType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        amount: { type: GraphQLInt },
        date: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:6000/plans/" + args.id, {
            title: args.title,
            amount: args.amount,
            date: args.date,
          })
          .then((res) => res.data);
      },
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:6000/users", {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
          })
          .then((res) => res.data);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://localhost:6000/users/" + args.id)
          .then((res) => res.data);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:6000/users/" + args.id, {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
          })
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
