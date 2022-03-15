export interface LoggedUser {
  userId: string;
  role: string;
}

const key = 'loggedUser';

export const setLoggedUser = (user: LoggedUser): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(user));
  }
};

export const getLoggedUser = (): LoggedUser | null => {
  try {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (err) {
    console.log('PDEBUG getLoggedUser err: ', err);
  }

  return null;
};
