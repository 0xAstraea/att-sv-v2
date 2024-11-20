interface WhereClause {
    schemaId?: {
      equals: string;
    };
    decodedDataJson?: {
      contains: string;
    };
    AND?: {
      decodedDataJson: {
        contains: string;
      };
    }[];
    revoked?: {
      equals: boolean;
    };
  }
  
  interface Variables {
    where: WhereClause;
  }
  
  interface StampConfig {
    graphql_url: string;
    variables: Variables;
    pretrust_variables: Variables;
  }
  
  interface Config {
    AgoraPass: StampConfig;
    allowed_origins: string[];
  }
  
  const config: Config = {
    AgoraPass: {
      graphql_url: "https://base.easscan.org/graphql",
      variables: {
        where: {
          schemaId: {
            equals: "0xa142412d946732a5a336236267a625ab2bc5c51b9d6f0703317bc979432ced66"
          },
        //   AND: [
        //     {
        //       decodedDataJson: {
        //         contains: "0x41676f7261436974790000000000000000000000000000000000000000000000"
        //       }
        //     },
        //     {
        //       decodedDataJson: {
        //         contains: "0x5a757a616c750000000000000000000000000000000000000000000000000000"
        //       }
        //     },
        //     {
        //       decodedDataJson: {
        //         contains: "0x41676f7261000000000000000000000000000000000000000000000000000000"
        //       }
        //     }
        //   ],
          revoked: {
            equals: false
          }
        }
      },
      pretrust_variables: {
        where: {
          schemaId: {
            equals: "0xe6428e26d2e2c1a92ac3f5b30014a228940017aa3e621e9f16f02f0ecb748de9"
          },
          revoked: {
            equals: false
          }
        }
      }
    },
    allowed_origins: [
      "https://app.stamp.network",
      "https://staging-pass.agora.city"
    ]
  };
  
  export default config;