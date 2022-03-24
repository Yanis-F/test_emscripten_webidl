var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;

var server = http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
		, filename = path.join(process.cwd() + "/bin/", uri);

	fs.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) filename += '/index.html';

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {        
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}

			console.log("serving file ", filename)
			var split = filename.split('.')
			var extension = split[split.length - 1]

			if (extension === "html") {
				response.setHeader("content-type", "text/html")
			}
			if (extension === "js") {
				response.setHeader("content-type", "text/javascript")
			}
			if (extension === "wasm") {
				response.setHeader("content-type", "application/wasm")
			}
			response.setHeader("Cross-Origin-Opener-Policy", "same-origin")
			response.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
			response.writeHead(200);
			response.write(file, "binary");
			response.end();
		});
	});
})

server.listen(port); 

console.log('Node.js web server at port ', port, ' is running..')

// var http = require('http'); 
// 
// var server = http.createServer(function (req, res) {   
// 	const { method, url } = res;
// 
// 	res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
// 	res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
// 	res.statuscode = 200
// 
// });
// 
// server.listen(5000); 
// 
// console.log('Node.js web server at port 5000 is running..')
