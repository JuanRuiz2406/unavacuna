import moment from "moment";

export const PreparePatients = (patients = []) => {
  return patients.map((e) => ({
    ...e,
    registerDate: moment(e.registerDate).format("DD/MM/YYYY"),
  }));
};
