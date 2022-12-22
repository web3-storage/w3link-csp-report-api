import { Api } from '@serverless-stack/resources'

import { getCustomDomain, getApiPackageJson, getGitInfo } from './config.js'

/**
 * @param {import('@serverless-stack/resources').StackContext} properties
 */
export function ApiStack({ stack }) {
  stack.setDefaultFunctionProps({
    srcPath: 'api'
  })

  const customDomain = getCustomDomain(stack.stage, process.env.HOSTED_ZONE)
  const pkg = getApiPackageJson()
  const git = getGitInfo()

  const api = new Api(stack, 'api', {
    customDomain,
    defaults: {
      function: {
        environment: {
          NAME: pkg.name,
          VERSION: pkg.version,
          COMMIT: git.commmit,
          STAGE: stack.stage,
        }
      }
    },
    routes: {
      'POST /': 'functions/lambda.handler',
      'GET /': 'functions/lambda.handler',
      'GET /version': 'functions/lambda.version'
    },
  })
  stack.addOutputs({
    ApiEndpoint: api.url,
    CustomDomain: customDomain ? `https://${customDomain.domainName}` : 'Set HOSTED_ZONE in env to deploy to a custom domain'
  })
}
