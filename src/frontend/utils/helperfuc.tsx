export const convertArrayToObject = (array: any[]) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item["sectionName"]]: item,
    };
  }, initialValue);
};
