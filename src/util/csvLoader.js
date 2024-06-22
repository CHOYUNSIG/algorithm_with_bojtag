export default function csvLoader(
  name,
  callback,
  isWeak = false,
  keyIndex = 0
) {
  fetch("/csv/" + name + ".csv")
    .then((response) => response.text())
    .then((text) => {
      const table = text
        .split("\n")
        .map((row) => row.split(",").map((data) => data.trim()));
      const result = new Map();
      for (let row = 1; row < table.length; row++) {
        let newRow = {};
        for (let col = 0; col < table[row].length; col++) {
          if (col === keyIndex) {
            if (isWeak) {
              if (!result.has(table[row][col]))
                result.set(table[row][col], new Set());
              result.get(table[row][col]).add(newRow);
            } else {
              result.set(table[row][col], newRow);
            }
          } else newRow[table[0][col]] = table[row][col];
        }
        if (keyIndex === null) result.set(row, newRow);
      }
      callback(result);
    });
}
