/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps, useLocation } from '@reach/router';
import { hasPermission } from '@src/utils/permission';
import { useSelector } from 'react-redux';
import { AppState } from '@src/store/reducers';
import Loading from '@src/components/Loading';
import { PermissionProvider } from '@src/components/Permission';

const onlyAccessIfNotLoggedIn = [RegExp(/^\/login/, 'i')];

export const RedirectIfNoPermission: React.FunctionComponent = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const canAccess = hasPermission(pathname);
    if (!canAccess) {
      navigate('/');
    }
  }, [pathname]);
  return null;
};

interface AccessCheckerProps {
  children?: any;
  noAuth: boolean;
  location: RouteComponentProps['location'];
}

const AccessChecker: React.FunctionComponent<AccessCheckerProps> = ({
  children,
  noAuth, // true - non authorized users can view this
  location,
}) => {
  const { user: profile } = useSelector((state: AppState) => state.auth);
  // anyone can view this page i.e. (no auth page and both
  // logged in and logged out users can view it)
  const anyoneCanViewIt =
    noAuth &&
    location &&
    onlyAccessIfNotLoggedIn.findIndex(oneRoute =>
      oneRoute.test(location.pathname),
    ) === -1;

  const userDataExist = !!profile;

  if (anyoneCanViewIt) {
    // anyone can view these pages
    console.log('full access');
  } else if (noAuth && !anyoneCanViewIt) {
    // this page should only be visible if user is not logged in
    if (userDataExist) {
      // if user is logged in then redirect
      console.log('logged in access');
      navigate('/');
      return <Loading />;
    }
  } else {
    if (!userDataExist) {
      location &&
        navigate(
          `/login?redirect=${encodeURIComponent(
            location.pathname + location.search + location.hash,
          )}`,
        );
      location && console.log('not login access1111: ', location, location.pathname + location.search + location.hash);
      return <Loading />;
    } else if (
      location &&
      ['/home', '/home/'].indexOf(location.pathname) === -1
    ) {
      // navigate('/');
      console.log('not login access: ', location);
    }
  }

  return noAuth ? (
    children
  ) : (
    <>
      {/* permission should only be checked for logged in routes */}
      <RedirectIfNoPermission />
      <PermissionProvider>{children}</PermissionProvider>
    </>
  );
};

export default AccessChecker;
