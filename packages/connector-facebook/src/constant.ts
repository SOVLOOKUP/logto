import path from 'path';

import { ConnectorMetadata, ConnectorType } from '@logto/connector-types';
import { getFileContents } from '@logto/shared';
import { z } from 'zod';

/**
 * Note: If you do not include a version number we will default to the oldest available version, so it's recommended to include the version number in your requests.
 * https://developers.facebook.com/docs/graph-api/overview#versions
 */
export const authorizationEndpoint = 'https://www.facebook.com/v13.0/dialog/oauth';
export const accessTokenEndpoint = 'https://graph.facebook.com/v13.0/oauth/access_token';
/**
 * Note: The /me node is a special endpoint that translates to the object ID of the person or Page whose access token is currently being used to make the API calls.
 * https://developers.facebook.com/docs/graph-api/overview#me
 * https://developers.facebook.com/docs/graph-api/reference/user#Reading
 */
export const userInfoEndpoint = 'https://graph.facebook.com/v13.0/me';
export const scope = 'email,public_profile';

export const facebookConfigGuard = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});

export type FacebookConfig = z.infer<typeof facebookConfigGuard>;

// eslint-disable-next-line unicorn/prefer-module
const currentPath = __dirname;
const pathToReadmeFile = path.join(currentPath, '..', 'README.md');
const pathToConfigTemplate = path.join(currentPath, '..', 'docs', 'config-template.md');
const readmeContentFallback = 'Please check README.md file directory.';
const configTemplateFallback = 'Please check config-template.md file directory.';

export const defaultMetadata: ConnectorMetadata = {
  id: 'facebook',
  type: ConnectorType.Social,
  name: {
    en: 'Sign In with Facebook',
    'zh-CN': 'Facebook 登录',
  },
  logo: './logo.png',
  description: {
    en: 'Sign In with Facebook',
    'zh-CN': 'Facebook 登录',
  },
  readme: getFileContents(pathToReadmeFile, readmeContentFallback),
  configTemplate: getFileContents(pathToConfigTemplate, configTemplateFallback),
};

export const defaultTimeout = 5000;