
let accessToken: string | null = null;
let role: string | null = null;
let userName: string | null = null;

export const authStore = {
  getAccessToken: (): string | null => accessToken,
  setAccessToken: (token: string | null): void => {
    accessToken = token;
  },
  getRole: () => role,
  setRole: (r: string | null) => { role = r; },
  getUserName: () => userName,
  setUserName: (name: string | null) => { userName = name; }
};
