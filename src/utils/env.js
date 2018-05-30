export const isClient = () => typeof window !== "undefined";

export const isServer = () => !isClient();

export const onClient = cb => {
  return isClient() ? cb() : null;
};

export const onServer = cb => {
  return isServer() ? cb() : null;
};

