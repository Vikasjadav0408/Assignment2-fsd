const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
    let filePath = req.url === "/" ? "./public/index.html" :
        `./public${req.url}`;
    let extname = path.extname(filePath);
    let contentType = "text/html";
    // Set content type based on file extension

    switch (extname) {
        case ".html":
            contentType = "text/html";
            break;

        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".png":
        case ".jpg":
        case ".jpeg":
            contentType = `image/${extname.slice(1)}`;
            break;
        case ".mp3":
            contentType = "audio/mpeg";
            break;
        case ".pdf":
            contentType = "applocation/pdf";
            break;
        case ".txt":
            contentType = "text/plain";
            break;
        default:
            contentType = "application/octet-stream";

    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

server.listen(3000, () => console.log("Server is running on port 3000"));