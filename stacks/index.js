import { Tags, RemovalPolicy } from 'aws-cdk-lib'

import { ApiStack } from './api-stack.js'
import { isPrBuild } from './config.js'

/**
 * @param {import('@serverless-stack/resources').App} app
 */
export default function (app) {
  if (isPrBuild(app.stage)) {
    // destroy buckets and tables for PR builds
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY)
  }

  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'api',
    bundle: {
      format: 'esm',
    },
  })
  app.stack(ApiStack)

  // tags let us discover all the aws resource costs incurred by this app
  // see: https://docs.sst.dev/advanced/tagging-resources
  Tags.of(app).add('Project', 'w3link-csp-report-api')
  Tags.of(app).add('Repository', 'https://github.com/web3-storage/w3link-csp-report-api')
  Tags.of(app).add('Environment', `${app.stage}`)
  Tags.of(app).add('ManagedBy', 'SST')
}
