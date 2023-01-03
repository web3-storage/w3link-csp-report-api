# CSP Report server for w3link

w3link and nftstorage.link use [Content-Security-Policy Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) to control resources the user agent is allowed to load for a given page. This helps guard against attacks from bad actors.

Adding CSP Headers can have side effects to w3link users who rely on w3link to host their legit websites that now have external HTTP calls blocked. The server 

## Getting Started

The repo contains the infra deployment code and the api implementation.

```
├── stacks      - sst and aws cdk code to deploy all the things
└── api         - lambda implementation of the api http gateway
```

To work on this codebase **you need**:

- Node.js >= v16 (prod env is node v16)
- An AWS account with the AWS CLI configured locally
- Install the deps with `npm i`

Deploy dev services to your aws account and start dev console

```console
npm start
```

See: https://docs.sst.dev for more info on how things get deployed.

## Deployment 

Deployment is managed by [seed.run]. PR's are deployed automatically to `https://<pr#>.csp-report-to.web3.storage`. 

The `main` branch is deployed to https://staging.csp-report-to.web3.storage and staging builds are promoted to prod manually via the UI at https://console.seed.run
