export const MapUserData = async (user) => {
  const { uid, email, displayName } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    name: displayName,
    token,
  };
};
