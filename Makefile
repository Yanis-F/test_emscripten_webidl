

all:
	emmake $(MAKE) -C src/
	tsc
	mkdir -p build/mylib/
	cp src/mylib/* build/mylib/
