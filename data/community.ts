export interface CommunityLink {
    type: string;
    url: string;
  }
  
  export interface Community {
    name: string;
    description: string;
    category: string;
    subcategory: string;
    platform: string;
    links: CommunityLink[];
  }
  
  export const communities: Record<string, Community> = {
    AgoraCity: {
      name: "AgoraCity",
      description: "Join the solution to decentralize invitations into communities, such as Zuzalu and decrease the dependency on trust in centralized authorities in our community",
      category: "Zuzalu",
      subcategory: "Agora",
      platform: "AgoraCity",
      links: [
        { type: "website", url: "https://pass.agora.city/" },
        { type: "twitter", url: "https://t.co/LDTNJrccMW" }
      ]
    },
    CreciStamp: {
      name: "CreciStamp",
      description: "Aleph is convening the worlds brightest minds in Buenos Aires this August to pioneer the first crypto nation.",
      category: "CreciStamp",
      subcategory: "-",
      platform: "Stamp",
      links: [
        { type: "website", url: "https://creci.stamp.network/" },
        { type: "twitter", url: "https://x.com/crecimientoar" }
      ]
    },
    BuilderMonastery: {
      name: "Builder Monastery",
      description: "Builder Monastery offers a focused environment where individuals can work on difficult problems. This space fosters collaboration, curiosity, and craftsmanship. Builder Monastery is designed to ensure everyone can engage fully, without fear of missing out on key experiences. ",
      category: "BuilderMonastery",
      subcategory: "-",
      platform: "Stamp",
      links: [
        { type: "website", url: "https://www.buildermonastery.com" },
        { type: "twitter", url: "https://x.com/b_monastery" }
      ]
    },
    MegaZu: {
      name: "MegaZu",
      description: "MegaZus vision is to unlock Ethereums true potential by bringing together world-class builders, thought leaders, and crypto enthusiasts in a vibrant, community-driven environment where the future of crypto is being actively built and shaped. ",
      category: "MegaZu",
      subcategory: "-",
      platform: "Stamp",
      links: [
        { type: "website", url: "https://www.megazu.fun/" },
        { type: "twitter", url: "https://x.com/MEGAZuzalu/" }
      ]
    },
    SocialStereo: {
      name: "Social Stereo",
      description: "Social Stereo is a community of builders, thinkers, and doers who are passionate about the future of social media. ",
      category: "SocialStereo",
      subcategory: "Music",
      platform: "Devcon",
      links: [
        { type: "website", url: "https://www.socialstereo.xyz/" },
        { type: "twitter", url: "https://x.com/socialstereo/" }
      ]
    }
  } as const;
  
  export default communities;
  