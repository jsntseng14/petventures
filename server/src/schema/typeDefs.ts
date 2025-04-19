import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type StoryScene {
    panelText: String!
    imagePrompt: String!
  }

  input PetProfileInput {
    name: String!
    personalityTraits: [String!]!
    theme: String!
  }

  type Query {
    healthCheck: String!
  }

  type Mutation {
    generateStory(petProfile: PetProfileInput!): [StoryScene!]!
  }
`;
