const tableList = ["group", "impl", "posts", "related", "tags"];

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
        const table = text
          .split("\n")
          .map((row) => row.split(",").map((data) => data.trim()));
        let result = new Set();
        for (let row = 1; row < table.length; row++) {
          let newRow = {};
          for (let col = 0; col < table[row].length; col++)
            newRow[table[0][col]] = table[row][col];
          result.add(newRow);
        }
        dispatch(fetchSuccess(name, result));
      }
    } catch (e) {}
  };
};
