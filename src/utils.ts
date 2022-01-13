export const createUserId = () => {
  let id = 0;
  const increment = () => {
    id++;
    return id;
  };

  return increment;
};
