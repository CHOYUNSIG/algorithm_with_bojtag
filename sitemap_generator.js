const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream, readFile } = require("fs");
const path = require("path");
const csvToTable = require("./src/util/csvToTable");

function generate() {
  const links = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/tags", changefreq: "weekly", priority: 0.8 },
    { url: "/post", changefreq: "weekly", priority: 0.8 },
  ];

  const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
  const csvPath = path.join(__dirname, "public", "csv", "impl.csv");

  const sitemapStream = new SitemapStream({
    hostname: "https://algorithm-with-bojtag.vercel.app/",
  });
  const writeStream = createWriteStream(sitemapPath);

  sitemapStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    readFile(csvPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading CSV file:", err);
        return reject(err);
      }

      // CSV에서 포스트 링크 추출
      const table = csvToTable(data);
      table.forEach(({ tag }) => {
        links.push({
          url: `/post/${tag}`,
          changefreq: "weekly",
          priority: 0.5,
        });
      });

      links.forEach((link) => sitemapStream.write(link));
      sitemapStream.end();

      streamToPromise(sitemapStream)
        .then(() => {
          console.log("Sitemap created successfully.");
          resolve();
        })
        .catch((error) => {
          console.error("Error creating sitemap:", error);
          reject(error);
        });
    });
  });
}

generate();
