export default function headerExtractor(markdown) {
  const lines = markdown.split("\n").map((line) => {
    return line.trim();
  });

  let code = 0;
  let header = [];
  for (let line of lines) {
    if (line.length >= 3 && line.substring(0, 3) === "```") {
      if (line.length > 3) code++;
      else code--;
    }
    if (!line.length || line[0] !== "#" || code > 0) continue;
    
    let depth = 0;
    while (line[++depth] === "#") continue;
    header.push({"depth": depth, "header": line.slice(depth).trim()});
  }
  
  return header;
}
