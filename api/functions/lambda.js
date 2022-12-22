/**
 * AWS HTTP Gateway handler for GET /version
 *
 * @param {import('aws-lambda').APIGatewayProxyEventV2} event 
 */
export const handler = async (event) => {
  // @ts-ignore
  const events = JSON.parse(event.body || '[]').map((e) => ({
    type: e.type,
    blockedURL: e.body?.blockedURL,
    documentURL: e.body?.documentURL,
    effectiveDirective: e.body?.effectiveDirective
  }))

  console.log(events)

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello, World! Your request was received at ${event.requestContext.time}.`,
  }
}

const repo = 'https://github.com/web3-storage/w3link-csp-report-api'

/**
 * AWS HTTP Gateway handler for GET /version
 *
 * @param {import('aws-lambda').APIGatewayProxyEventV2} request 
 */
export async function version (request) {
  const { NAME: name , VERSION: version, COMMIT: commit, STAGE: env } = process.env

  return {
    statusCode: 200,
    headers: {
      'Content-Type': `application/json`
    },
    body: JSON.stringify({ name, version, repo, commit, env })
  }
}
