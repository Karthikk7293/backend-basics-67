const http = require('http')
const fs = require('fs')


const server = http.createServer((req, res) => {

    // console.log(req);

    const { method, url } = req


    if (method === 'GET' && url === '/') {
        console.log({ method, url });

        res.end(JSON.stringify({ success: true, message: "this is completed" }))

    } else if (method === 'GET' && url === '/users') {
        console.log({ method, url });

        res.end(JSON.stringify({ success: true, message: "this is user route" }))
    }



})

server.listen(3000, () => {
    console.log("app is running......");

})