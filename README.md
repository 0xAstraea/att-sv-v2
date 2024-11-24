<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## API Documentation

### Get Community Members

Retrieves all attestations for a specific community with pagination support and optional ENS resolution.

```http
GET /communities/members?communityId={communityId}&page={page}&limit={limit}&includeEns={includeEns}&uniqueAttesters={uniqueAttesters}
```

#### Parameters

| Parameter       | Type     | Description                                                                    | Default |
|----------------|----------|--------------------------------------------------------------------------------|---------|
| communityId    | string   | The ID of the community. Must match a key in the communities configuration.     | -       |
| page           | number   | The page number for pagination (starts at 1)                                    | 1       |
| limit          | number   | Number of items per page                                                        | 10      |
| includeEns     | boolean  | Include ENS names for attesters if available                                    | false   |
| uniqueAttesters| boolean  | Only return unique attesters (removes duplicates)                               | false   |

#### Available Communities
- `AgoraPass`
- `SocialStereo`

#### Example Requests
```bash
# Basic request with default pagination
curl -X GET 'http://localhost:3000/communities/members?communityId=AgoraPass'

# Request with ENS resolution and unique attesters
curl -X GET 'http://localhost:3000/communities/members?communityId=AgoraPass&includeEns=true&uniqueAttesters=true'

# Request with all options
curl -X GET 'http://localhost:3000/communities/members?communityId=AgoraPass&page=2&limit=20&includeEns=true&uniqueAttesters=true'
```

#### Example Response
```json
{
  "data": {
    "attestations": [
      {
        "recipient": "0x1234...",
        "attester": "0x5678...",
        "ensName": "vitalik.eth"  // Only present if includeEns=true
      }
      // ... more attestations (up to 'limit' items)
    ]
  }
}
```

#### Error Responses

| Status Code | Description                                           | Example                                                  |
|-------------|-------------------------------------------------------|----------------------------------------------------------|
| 404         | Community not found                                   | `{"message":"Community AgoraCity not found","statusCode":404}` |
| 500         | Server error (e.g., GraphQL request failed)           | `{"message":"Internal server error","statusCode":500}`        |

#### Pagination Notes
- Page numbers start at 1
- If no page is specified, defaults to page 1
- If no limit is specified, defaults to 10 items per page
- Maximum items per page is server-configured

### Get Address Attestation Counts

Retrieves the number of attestations given and received by an Ethereum address within a specific community.

```http
GET /addresses/{address}/attestations?communityId={communityId}
```

#### Parameters

| Parameter    | Type     | Description                                                                    | Required |
|-------------|----------|--------------------------------------------------------------------------------|----------|
| address     | string   | Ethereum address to check (path parameter)                                      | Yes      |
| communityId | string   | The ID of the community. Must match a key in the communities configuration.     | Yes      |

#### Example Requests
```bash
# Get attestation counts for an address in SocialStereo community
curl -X GET 'http://localhost:3000/addresses/0x742d35Cc6634C0532925a3b844Bc454e4438f44e/attestations?communityId=SocialStereo'

# Get attestation counts for an address in AgoraPass community
curl -X GET 'http://localhost:3000/addresses/0x742d35Cc6634C0532925a3b844Bc454e4438f44e/attestations?communityId=AgoraPass'
```

#### Example Response
```json
{
  "data": {
    "given": 5,     // Number of attestations given by this address
    "received": 3    // Number of attestations received by this address
  }
}
```

#### Error Responses

| Status Code | Description                                           | Example                                                  |
|-------------|-------------------------------------------------------|----------------------------------------------------------|
| 400         | Invalid Ethereum address                              | `{"message":"Invalid address format","statusCode":400}`   |
| 404         | Community not found                                   | `{"message":"Community AgoraPass not found","statusCode":404}` |
| 500         | Server error (e.g., GraphQL request failed)           | `{"message":"Internal server error","statusCode":500}`        |

#### Notes
- The address parameter should be a valid Ethereum address
- Counts include only non-revoked attestations
- Attestations are filtered by community-specific parameters (category, subcategory, platform)
- The response includes both attestations given by the address (as attester) and received by the address (as recipient)

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
