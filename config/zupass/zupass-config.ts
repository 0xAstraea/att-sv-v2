import type { PipelineEdDSATicketZuAuthConfig } from "@pcd/passport-interface";
import { ESMERALDA_TICKET } from "@pcd/zuauth";
import { ticketTypeNames } from "./constants";
import { TicketTypeName } from "./types";

/**
 * We want to match a ticket based on a pairing of event IDs and product IDs.
 * We also want to divide these into categories or "types" of ticket. There
 * are four types, as defined above, and each type has one or more pairs of
 * event and product IDs that qualify a ticket as belonging to that group.
 *
 * With this data, we can classify a user's ticket and use this to make some
 * decisions about what access to grant, or other features to enable or
 * disable.
 */
export const whitelistedTickets: Record<
  TicketTypeName,
  PipelineEdDSATicketZuAuthConfig[]
> = {
  Zuzalu: [
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
        "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
      ],
      eventId: "5de90d09-22db-40ca-b3ae-d934573def8b",
      eventName: "Zuzalu",
      productId: "5ba4cd9e-893c-4a4a-b15b-cf36ceda1938",
      productName: "Resident"
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
        "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
      ],
      eventId: "5de90d09-22db-40ca-b3ae-d934573def8b",
      eventName: "Zuzalu",
      productId: "10016d35-40df-4033-a171-7d661ebaccaa",
      productName: "Organizer"
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
        "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
      ],
      eventId: "5de90d09-22db-40ca-b3ae-d934573def8b",
      eventName: "Zuzalu",
      productId: "53b518ed-e427-4a23-bf36-a6e1e2764256",
      productName: "Visitor"
    }
  ],
  ZuConnect: [
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
        "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
      ],
      eventId: "91312aa1-5f74-4264-bdeb-f4a3ddb8670c",
      eventName: "ZuConnect",
      productId: "cc9e3650-c29b-4629-b275-6b34fc70b2f9",
      productName: "Resident"
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
        "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
      ],
      eventId: "54863995-10c4-46e4-9342-75e48b68d307",
      eventName: "ZuConnect",
      productId: "d2123bf9-c027-4851-b52c-d8b73fc3f5af",
      productName: "First Week"
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
        "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
      ],
      eventId: "797de414-2aec-4ef8-8655-09df7e2b6cc6",
      eventName: "ZuConnect",
      productId: "d3620f38-56a9-4235-bea8-0d1dba6bb623",
      productName: "Scholarship"
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
        "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
      ],
      eventId: "f7370f63-b9ae-480c-9ded-0663f1922bef",
      eventName: "ZuConnect",
      productId: "0179ed5b-f265-417c-aeaa-ac61a525c6b0",
      productName: "Organizer"
    }
  ],
  Vitalia: [
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "0d3388a18b89dd012cb965267ab959a6ca68f7e79abfdd5de5e3e80f86821a0d",
        "0babbc67ab5da6c9245137ae75461f64a90789ae5abf3737510d5442bbfa3113"
      ],
      eventId: "9ccc53cb-3b0a-415b-ab0d-76cfa21c72ac",
      eventName: "Vitalia",
      productId: "cd3f2b06-e520-4eff-b9ed-c52365c60848",
      productName: "Resident"
    }
  ],
  ZuVillage: [
    {
      pcdType: "eddsa-ticket-pcd",
      productId: "aecf9f84-b92f-5b40-8541-cbb48f4d6267",
      publicKey: [
        "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
        "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
      ],
      eventId: "6f5f194b-97b5-5fe9-994d-0998f3eacc75",
      eventName: "ZuVillage Georgia",
      productName: "Contributor"
    }
  ],
  Esmeralda: ESMERALDA_TICKET,
  AgoraCore: [
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
        "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
      ],
      productId: "15ab7fc2-eaea-5c0c-87d5-6b233b030a9b",
      eventId: "3dcdb35d-507c-57e8-8629-5a09239f7033",
      eventName: "AgoraCity",
      productName: "Founder"
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
        "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
      ],
      productId: "28155a86-913f-57dd-a65c-d16ae3149385",
      eventId: "6900784f-b677-5885-b8fc-bc824cfd88d6",
      eventName: "AgoraCity",
      productName: "Contributor"
    }
  ],
  MegaZu24: [
    {
      "pcdType": "eddsa-ticket-pcd",
      "publicKey": [
        "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
        "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
      ],
      "productId": "b6d0715e-27be-5bf2-8041-125cc8e89d07",
      "eventId": "70848dea-365b-5838-b36e-f691e3151cbd",
      "eventName": "MegaZu24",
      "productName": "Resident"
    },
    {
      "pcdType": "eddsa-ticket-pcd",
      "publicKey": [
        "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
        "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
      ],
      "productId": "7929010a-d31f-5355-a633-b2e8af4f36db",
      "eventId": "70848dea-365b-5838-b36e-f691e3151cbd",
      "eventName": "MegaZu24",
      "productName": "Core-Organizer"
    }
  ],
  Devcon: [
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "220f81f4-ca7b-4e47-bfb7-14bf1aa94a89",
      productName: "General Admission",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "45b07aad-b4cf-4f0e-861b-683ba3de49bd",
      productName: "Protocol Guild / Merge Pass Holders",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "e6df2335-00d5-4ee1-916c-977d326a9049",
      productName: "OSS Contributors",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "2ab74a56-4182-4798-a485-6380f87d6299",
      productName: "Solo Stakers",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "9fb49dd1-edea-4c57-9ff2-6e6c9c3b4a0a",
      productName: "Public Goods Fundraisers",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "1ad9e110-8745-4eed-8ca5-ee5b8cd69c0f",
      productName: "Raffle-Auction Winner",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "6b0f70f1-c757-40a1-b6ab-a9ddab221615",
      productName: "Devcon 6 Attendees",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "08482abb-8767-47aa-be47-2691032403b6",
      productName: "Complimentary Ticket",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "2a86d360-4ca2-43b5-aeb5-9a070da9a992",
      productName: "Local SEA Builder Discount",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "c900d46a-99fd-4f7a-8d6b-10d041b2601b",
      productName: "Builder Discount",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "3de2fcc5-3822-460c-8175-2eef211d2f1d",
      productName: "Academic Discount",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "c97cb25e-302b-4696-ac24-2a7a8255572e",
      productName: "Youth Discount",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "695cedfe-a973-4371-acc4-907bde4251c5",
      productName: "Volunteer",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "41a055e0-db9c-41ff-8e9c-5834c9d64c6d",
      productName: "Press",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "b50febf2-a258-4ee6-b3e4-2b2c2e57a74e",
      productName: "Supporter",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "f15237ec-abd9-40ae-8e61-9cf8a7a60c3f",
      productName: "EFer",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "a4c658af-0b37-41ac-aa0a-850b6b7741be",
      productName: "EF Guests",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "c64cac28-5719-4260-bd9a-ea0c0cb04d54",
      productName: "Speakers",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "bc67b24b-52e1-418e-832a-568d1ae5a58c",
      productName: "POAP Holder Discount",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "b44cac2f-92b5-405e-9aa1-7127661790e2",
      productName: "DAO Governance Participants",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "81620f49-d7fc-4ccb-a7bb-0ad81d97191a",
      productName: "Indian Resident (AnonAadhaar) Builder",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "1bbc0ec1-5be9-43ff-acd3-d4ca794f814f",
      productName: "zkPassport Local Builder",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "3c30c8e0-4f96-4b46-b2c9-72954e31ab51",
      productName: "Reserve",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "f4f14100-f816-4e2e-a770-78dacaee4e2f",
      productName: "Grant Recipients",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "5dcea12b-5862-404f-8943-2fbb35322e4e",
      productName: "Community Reserve",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "c751e137-bb3c-44f3-94c2-f81f0bc00276",
      productName: "Devcon Scholar",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "8725de16-8edc-4c13-aeaa-1819aee98aeb",
      productName: "Day 2 Pass (Nov. 13)",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "7a88209f-3248-4a53-b568-bb6861e60506",
      productName: "Day 3 Pass (Nov. 14)",
    },
    {
      pcdType: "eddsa-ticket-pcd",
      publicKey: [
        "044e711fd3a1792a825aa896104da5276bbe710fd9b59dddea1aaf8d84535aaf",
        "2b259329f0adf98c9b6cf2a11db7225fdcaa4f8796c61864e86154477da10663",
      ],
      eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      eventName: "Devcon: Southeast Asia",
      productId: "7d4f5da2-9d5f-46ab-a28f-7cf38e016281",
      productName: "Day 4 Pass (Nov. 15)",
    },
]
  //  America: [
  //   {
  //     pcdType: "eddsa-ticket-pcd",
  //     publicKey: [
  //       "05e0c4e8517758da3a26c80310ff2fe65b9f85d89dfc9c80e6d0b6477f88173e",
  //       "29ae64b615383a0ebb1bc37b3a642d82d37545f0f5b1444330300e4c4eedba3f"
  //     ],
  //     eventId: "be4dbf9c-abc9-4bc2-a731-3464b84ce3fb",
  //     eventName: "ETH Latam",
  //     productId: "8d081915-8d2e-4660-adb6-3841960f810f",
  //     productName: "Regular ticket"
  //   }
  // ],
  // TestTicket: [
  //   {
  //     pcdType: "eddsa-ticket-pcd",
  //     publicKey: [
  //       "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
  //       "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
  //     ],
  //     productId: "b8bcccb9-3912-5329-aaa3-ea4cb7ab4a0d",
  //     eventId: "718555c0-3ce7-5844-8ad3-da9ba4ae897b",
  //     eventName: "Europe",
  //     productName: "GA"
  //   },
  //   {
  //     pcdType: "eddsa-ticket-pcd",
  //     publicKey: [
  //       "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
  //       "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
  //     ],
  //     productId: "c7807d6c-3cea-5ce6-ba97-519d543265fe",
  //     eventId: "63933c56-d49e-509e-af29-575e19375a80",
  //     eventName: "Europe",
  //     productName: "VIP"
  //   },
  //   {
  //     pcdType: "eddsa-ticket-pcd",
  //     publicKey: [
  //       "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
  //       "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
  //     ],
  //     productId: "f4c59e92-0368-5082-9fd2-6f3b245de231",
  //     eventId: "7fd0a623-ab22-51d7-8920-abf5de0acb22",
  //     eventName: "America",
  //     productName: "GA"
  //   }
  // ],
};

// Map the above data structure into a simple array of event IDs.
export const supportedEvents = Object.values(whitelistedTickets).flatMap(
  (items) => items.map((item) => item.eventId)
);

/**
 * Use the above data structure to map a ticket's event ID and product ID to
 * a known ticket type, if any exists. Returns undefined if no match is found.
 */
export function matchTicketToType(
  eventIdToMatch: string,
  productIdToMatch: string
): TicketTypeName | undefined {
  for (const name of ticketTypeNames) {
    for (const { eventId, productId } of whitelistedTickets[name]) {
      if (eventId === eventIdToMatch && productId === productIdToMatch) {
        return name;
      }
    }
  }

  return undefined;
}
