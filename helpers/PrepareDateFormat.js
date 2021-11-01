import moment from "moment";

export const PrepareDateFormat = (data = []) => {
  return data.map((e) => ({
    ...e,
    createdAt: moment(e.createdAt).format("DD/MM/YYYY"),
  }));
};
