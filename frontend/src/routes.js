const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  registrationPath: () => [apiPath, 'signup'].join('/'),

  rootPagePath: () => '/',
  loginPagePath: () => '/login',
  singUpPagePath: () => '/signup',
  notFoundPagePath: () => '*',
};
