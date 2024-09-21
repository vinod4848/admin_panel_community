const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const Config = {
  headers: {
    ...(userFromLocalStorage?.token && {
      Authorization: `Bearer ${userFromLocalStorage.token}`,
    }),
    Accept: "application/json",
  },
};
