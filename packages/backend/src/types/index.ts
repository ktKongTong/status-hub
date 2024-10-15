import {Context} from "hono";
import {CredentialRefresh} from "status-hub-shared/models";

export type CredentialType = 'cookie' | 'oauth' | 'apiToken' | 'credential' | 'oidc' | 'none'

export interface Namespace {
  platform: string
  category: string[]
  supportCredentials: PlatformCredential[]
  // routes: Record<string, RouteItem<string>>
}

// define schema
export interface PlatformCredential {
  platform: string
  version: number
  credentialType: CredentialType;
  autoRefreshable: boolean;
  maximumRefreshIntervalInSec?: number;
  refreshLogic?: string;
  availablePermissions?: string[],
  permissions?: string[],
  fields: Record<string, CredentialField>;
}


// 'ok' | 'out-date' | 'in-active' | 'unknown' | 'refreshing'
export const CredentialStatusArr:readonly string[] = ['ok', 'in-active', 'pending', 'unknown', 'out-date']
export type CredentialStatus = 'ok' | 'in-active' | 'pending' | 'unknown' | 'out-date'
// ok -> invalid
//

export interface CredentialField {
  type: 'string' | 'number' | 'boolean'
  isRequired: boolean
  description: string
}

export interface RouteItem<T extends string = ''> {
  path: T;
  usableCredentialType: CredentialType[];
  handler: (ctx:Context) => Response
}

export type RefreshFunction = (credential: CredentialRefresh, env?:any) => Promise<{
  values: Record<string, string | number | boolean>,
  isActive: boolean,
  status: CredentialStatus,
  ok: boolean,
}>

export const generateCredentialSchemaAndFieldsFromPlatformCredential = (c : PlatformCredential) => {
  const id = `system-${c.platform}-${c.credentialType}`
  const fields = c.fields

  const credentialFields = Object.keys(fields)
    .map(key => {
      const field = fields[key]
      return {
        schemaId: id,
        schemaVersion: c.version,
        fieldName: key,
        fieldType: field.type,
        isRequired: field.isRequired,
        description: field.description,
      }
    })

  const credentialSchema = {
    id: id,
    platform: c.platform,
    schemaVersion: c.version,
    credentialType: c.credentialType,
    autoRefreshable: c.autoRefreshable,
    maximumRefreshIntervalInSec: c.maximumRefreshIntervalInSec ?? 0,
    available: true,
    availablePermissions: c.availablePermissions?.join(",") ?? '',
    permissions: c.permissions?.join(",") ?? '',
    refreshLogic: c.refreshLogic,
    refreshLogicType: 'system' as const,
    schemaFields: credentialFields,
    status: 'ok',
    createdBy: 'system' as const,
  }
  return {
    schema:credentialSchema,
    fields: credentialFields
  }
}

export type SystemSchemaInsert = ReturnType<typeof generateCredentialSchemaAndFieldsFromPlatformCredential>;