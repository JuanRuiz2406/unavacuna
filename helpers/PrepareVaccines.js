import moment from "moment";

export const PrepareVaccines = (vaccines = []) => {
  return vaccines.map((e) => ({
    ...e,
    registerDate: moment(e.registerDate).format("DD/MM/YYYY"),
  }));
};
