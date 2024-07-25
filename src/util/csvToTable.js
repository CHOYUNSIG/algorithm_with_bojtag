function csvToTable(text) {
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

  return result;
}

module.exports = csvToTable
