import React from 'react';
import {
  getLoggedUser,
  LoggedUser,
  setLoggedUser,
} from '@src/utils/loggedUser';
import Loading from '@src/components/Loading';
import { useSelector } from 'react-redux';
import { AppState } from '@src/store/reducers';

interface PermissionContextProps {
  params?: string;
}

const PermissionContext = React.createContext<PermissionContextProps>({});

export const PermissionProvider: React.FunctionComponent = ({ children }) => {
  const loggedUser = getLoggedUser();
  const { user: profile } = useSelector((state: AppState) => state.auth);

  if (!profile) {
    return <Loading />;
  }

  if (profile && (!loggedUser || loggedUser.role !== profile.role)) {
    const loggedUser: LoggedUser = {
      userId: profile.id,
      role: profile.role,
    };
    setLoggedUser(loggedUser);
  }

  const PermissionContextValues = {};

  return (
    <PermissionContext.Provider value={PermissionContextValues}>
      {children}
    </PermissionContext.Provider>
  );
};
