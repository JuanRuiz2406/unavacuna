import cookies from "js-cookie";

export const GetUserFromCookie = () => {
  const cookie = cookies.get("auth");
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const SetUserCookie = (user) => {
  cookies.set("auth", user, {
    expires: 1 / 24,
  });
};

export const RemoveUserCookie = () => cookies.remove("auth");
