import csvToTable from "../../util/csvToTable";

const tableList = ["group", "grouproot", "impl", "posts", "related", "tags"];

export const fetchSuccess = (name, table) => ({
  type: "FETCH_SUCCESS",
  name: name,
  table: table,
});

export const fetchTable = () => {
  return async (dispatch, getState) => {
    try {
      for (const name of tableList) {
        if (getState().csv[name])
          continue;
        const response = await fetch("/csv/" + name + ".csv");
        const text = await response.text();
        const table = csvToTable(text);
        dispatch(fetchSuccess(name, table));
      }
    } catch (e) {}
  };
};
