export const resolvers = {
    Query: {
      healthCheck: () => "Backend is running 🚀",
    },
    Mutation: {
      generateStory: async (_: any, { petProfile }: any) => {
        // TODO: Integrate OpenAI or story generator logic here
        const { name, personalityTraits, theme } = petProfile;
  
        return [
          {
            panelText: `${name} entered the unknown lands of ${theme}.`,
            imagePrompt: `Cartoon pet in a ${theme} setting`,
          },
          {
            panelText: `${name} used their ${personalityTraits[0]} spirit to face a new challenge!`,
            imagePrompt: `Pet doing something heroic with dramatic lighting`,
          },
        ];
      },
    },
  };
  