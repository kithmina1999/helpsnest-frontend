let accessToken = "";

export const storeAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
}