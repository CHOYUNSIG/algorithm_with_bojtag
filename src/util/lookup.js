export default function lookup(table, searchColumn, value, targetColumn) {
  let result = [];
  if (typeof searchColumn === "string") searchColumn = [searchColumn];
  if (typeof value === "string") value = [value];
  if (typeof targetColumn === "string") targetColumn = [targetColumn];
  for (const row of table) {
    let pass = true;
    for (let col = 0; col < searchColumn.length; col++) {
      if (row[searchColumn[col]] !== value[col]) {
        pass = false;
        break;
      }
    }
    if (pass) {
      let newRow = {};
      for (let col = 0; col < targetColumn.length; col++) {
        newRow[targetColumn[col]] = row[targetColumn[col]];
      }
      result.push(newRow);
    }
  }
  return result;
}
