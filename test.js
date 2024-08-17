const http = require('http');
const port = process.env.PORT || 8000;

function getQueryParams(url) {
    const fullUrl = new URL(url, `http://localhost`);
    const params = new URLSearchParams(fullUrl.search);
    const result = {};

    for (let [key, value] of params.entries()) {
        result[key] = value;
    }

    return result;
}

http.createServer((req, res) => {
    const authorizationHeader = req.headers.authorization;
    
    console.log('Authorization header:', authorizationHeader);

    if (authorizationHeader !== "1234") {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Unauthorized" }));
        console.log("Nie udalo sie zalogowac");
        return;
    }

    const queryParams = getQueryParams(req.url);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(queryParams));
    console.log("Jestes zalogowany.");

}).listen(port, () => {
    console.log(`Serwer jest na  http://localhost:${port}`);
});
