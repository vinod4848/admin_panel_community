const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const Config = {
  headers: {
    Authorization: userFromLocalStorage?.token
      ? `Bearer ${userFromLocalStorage.token}`
      : undefined,
    Accept: "application/json",
  },
};
