import { getLoggedUser, LoggedUser } from './loggedUser';
import { rolesPermissionsMatrix, RolePermission } from './path';

const isMatchPath = (route: string, path: string): boolean => {
  const regex = new RegExp(
    '^' + route.replace(/:[^\s/]+/g, '([0-9]*)') + '+[/]?$',
  );

  if (path.match(regex)) {
    return true;
  }

  return false;
};
const isMatchPaths = (routes: string[], path: string): boolean => {
  return routes.some((route: string) => {
    return isMatchPath(route, path);
  });
};

const hasPermission = (path: string): boolean => {
  const rolePermission: RolePermission = Object.values(
    rolesPermissionsMatrix,
  ).find(
    (value: RolePermission) =>
      value.path === path || isMatchPath(value.path, path),
  );

  if (!rolePermission) return true;

  const loggedUser: LoggedUser | null = getLoggedUser();
  if (!loggedUser || !loggedUser.role) return false;

  return !!Object.entries(rolePermission.permission).find(
    ([role, value]: [string, boolean]) => value && role === loggedUser.role,
  );
};

const getRolesHavePermission = (path: string): string[] => {
  const rolePermission: RolePermission = Object.values(
    rolesPermissionsMatrix,
  ).find(
    (value: RolePermission) =>
      value.path === path || isMatchPath(value.path, path),
  );

  const roles =
    Object.entries(rolePermission.permission)
      .filter(([, value]: [string, boolean]) => value)
      .reduce((roles: string[], [key, value]: [string, boolean]) => {
        if (value) {
          roles.push(key);
        }
        return roles;
      }, []) || [];

  return roles;
};

export { isMatchPath, isMatchPaths, hasPermission, getRolesHavePermission };
