import {Context} from "hono";
import {CredentialType} from "@/interface";
import {createGitHubAPI} from "./github";
import {getCredentialByPlatformAndType} from "@/router/routes/util";

const handler = async (c:Context) => {
  const credentials = await getCredentialByPlatformAndType(c, 'github', ['apiToken'])
  const credential = credentials[0].credentialValues
  const api =  createGitHubAPI(credential.token as string ?? credential.accessToken!)
  const recentGitHubEvents = await api.getRecentEvent(credential.username as string, 20)
  return c.json(recentGitHubEvents)
}

export const route =  {
  path: '/recent',
  raw: true,
  usableCredentialType: ['apiToken'] as CredentialType[],
  handler: handler
}
