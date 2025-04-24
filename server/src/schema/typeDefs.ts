import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input StartStoryInput {
    petName: String!
    imageUrl: String!
    breed: String
    size: String
    weight: String
    age: String
    gender: String
    adventureType: String
    storyLength: String
    customPrompt: String
  }

  type ChoiceOption {
    text: String!
    consequence: String!
  }

  type StoryScene {
    caption: String!
    imagePrompt: String!
    imageUrl: String!
    choices: [ChoiceOption!]!
  }


  type Mutation {
    startStory(input: StartStoryInput!): [StoryScene!]!
  }
    

  type Query {
    healthCheck: String
  }
`;
