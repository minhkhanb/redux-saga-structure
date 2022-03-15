/* eslint-disable @typescript-eslint/no-var-requires */

export interface RolePermission {
  path: string;
  permission: {
    Admin: boolean;
    Creator: boolean;
    Moderator: boolean;
    User: boolean;
  };
}

export interface PathConfig {
  home: RolePermission;
}

interface PathParams {
  routeId?: string;
}

const rolesPermissionsMatrix: PathConfig = require('./rolesPermissionsMatrix.json');

export const getRoute = (path: string, params: PathParams): string => {
  return path.replace(/:[a-zA-Z?]+/g, match => {
    if (match === ':routeId') return params.routeId || match;
    return match;
  });
};

export { rolesPermissionsMatrix };
