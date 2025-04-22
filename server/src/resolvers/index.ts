import { startStory } from "../services/generateAdventure";

export const resolvers = {
  Query: {
    healthCheck: () => "Backend is up",
  },
  Mutation: {
    startStory: async (_: any, { input }: any) => {
      return await startStory(input);
    },
  },
};

