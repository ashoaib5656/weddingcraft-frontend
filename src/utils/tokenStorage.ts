const AUTH_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ROLE_KEY = 'userRole';
const USER_NAME_KEY = 'userName';
const USER_EMAIL_KEY = 'userEmail';

export const tokenStorage = {
    getAccessToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
    setAccessToken: (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token),
    removeAccessToken: () => localStorage.removeItem(AUTH_TOKEN_KEY),

    getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
    setRefreshToken: (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token),
    removeRefreshToken: () => localStorage.removeItem(REFRESH_TOKEN_KEY),

    getRole: () => localStorage.getItem(USER_ROLE_KEY),
    setRole: (role: string) => localStorage.setItem(USER_ROLE_KEY, role),
    removeRole: () => localStorage.removeItem(USER_ROLE_KEY),

    getUserName: () => localStorage.getItem(USER_NAME_KEY),
    setUserName: (name: string) => localStorage.setItem(USER_NAME_KEY, name),
    removeUserName: () => localStorage.removeItem(USER_NAME_KEY),

    getUserEmail: () => localStorage.getItem(USER_EMAIL_KEY),
    setUserEmail: (email: string) => localStorage.setItem(USER_EMAIL_KEY, email),
    removeUserEmail: () => localStorage.removeItem(USER_EMAIL_KEY),

    clear: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_ROLE_KEY);
        localStorage.removeItem(USER_NAME_KEY);
        localStorage.removeItem(USER_EMAIL_KEY);
    }
};
