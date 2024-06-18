export default function csvLoader(name, callback, keyIndex=0) {
  fetch("/csv/" + name + ".csv")
    .then((response) => response.text())
    .then((text) => {
      const table = text.split("\n").map((row) => row.split(",").map((data) => data.trim()));
      let result = new Map();
      for (let row = 1; row < table.length; row++) {
        let newRow = {};
        for (let col = 0; col < table[row].length; col++) {
          if (col === keyIndex) result.set(table[row][col], newRow);
          else newRow[table[0][col]] = table[row][col];
        }
      }
      callback(result);
    });
}
