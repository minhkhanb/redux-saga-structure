/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link, Match } from '@reach/router';
import styled from '@emotion/styled';

export interface NavLinkProps {
  navbarItem: NavbarItemProps;
  onClick?: (evt: MouseEvent) => void;
}

export interface NavbarItemProps {
  heading: string;
  icon?: React.FunctionComponent;
  route: string;
  routeDefault?: string;
  default?: boolean;
}

export interface NavBarProps {
  navbarItems: Array<NavbarItemProps>;
  className?: string;
}

export const CustomLink: React.FunctionComponent<any> = ({
  children,
  to,
  onClick,
  ...props
}) => {
  const linkRef = React.useRef<HTMLDivElement>(null);

  const internal = /^\/(?!\/)/.test(to);

  if (internal) {
    return (
      <Link
        className="cursor-pointer"
        to={to}
        ref={linkRef}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={to}
      className={`cursor-pointer ${props.className}`}
      {...props}
      ref={linkRef}
    >
      {children}
    </a>
  );
};

export const NavLink: React.FunctionComponent<NavLinkProps> = styled(
  ({ navbarItem, onClick }: NavLinkProps) => {
    return (
      <Match path={`${navbarItem.route}/*`}>
        {props => (
          <div>
            <CustomLink
              to={navbarItem.routeDefault || navbarItem.route}
              onClick={onClick}
              className={`hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                props.match ? 'bg-gray-900 text-white' : 'text-gray-300'
              }`}
            >
              <span className="text-md font-normal">{navbarItem.heading}</span>
            </CustomLink>
          </div>
        )}
      </Match>
    );
  },
)``;

export const NavBar: React.FunctionComponent<NavBarProps> = ({ navbarItems }) => {
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      {navbarItems.map((navbarItem, index) => (
        <NavLink key={index} navbarItem={navbarItem} />
      ))}
    </div>
  );
};
