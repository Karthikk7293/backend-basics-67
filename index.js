const http = require('http')
const fs = require('fs')


const server = http.createServer((req, res) => {
    console.log("hello world inside the server");

    // fs.writeFileSync('text.txt', '\n hello world!')

    fs.appendFile('../../../Desktop/E67/backend-basics/text.txt', '\n new data added', () => {
        console.log("completed!");

    })

    res.end("hello world! response to the client")
})

server.listen(3000, () => {
    console.log("app is running......");

})