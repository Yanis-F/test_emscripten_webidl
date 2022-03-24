const mylib_factory = require("./mylib/index")

async function run() {
	let mylib = await mylib_factory()

	let myclass = new mylib.Binding()


	console.log("Adding 1 and 2:")
	console.log(myclass.add(1, 2))

	let mystruct = new mylib.mystruct()
	mystruct.the_int = 40
	mystruct.the_long = 2
	console.log("Adding 'mystruct' :")
	console.log(myclass.get_mystruct_value(mystruct))
}

run()

export {}
