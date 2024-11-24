export const EASSCAN_BASE_GRAPHQL_URL = "https://base-sepolia.easscan.org/graphql";

export const EAS_CONFIG = {
    chainId: 8453,
    EAS_CONTRACT_ADDRESS: "0x4200000000000000000000000000000000000021",
    PRETRUST_SCHEMA: process.env.PRETRUST_SCHEMA || "0xe6428e26d2e2c1a92ac3f5b30014a228940017aa3e621e9f16f02f0ecb748de9",
    VOUCH_SCHEMA: process.env.VOUCH_SCHEMA || "0xb6b4f5642693a970d1c43bfd55b34a6a32cdce692c390958f201a5f529eb6893",
    STAMP_SCHEMA: process.env.STAMP_SCHEMA || "0xce5523e4dc2ef468d860e836399b6e374d998de3c33c9f1c4063999d8e2fed5a",
    GRAPHQL_URL: process.env.GRAPHQL_URL || "https://base.easscan.org/graphql",
}