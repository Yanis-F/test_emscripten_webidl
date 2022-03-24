LIBDIR = ./mylib/

# EMSDK beind a variable set my emscripten
WEBIDL_BINDER = "$(EMSDK)/upstream/emscripten/tools/webidl_binder"


re: clean all

ifndef EMSCRIPTEN
all:
	emmake $(MAKE)

_you_shall_not_pass:
else

all:
endif

	mkdir -p $(LIBDIR)
	# creates type declaration
	webidl2ts -e -i mylib.idl -o $(LIBDIR)index.d.ts
	# creates glue.js and glue.cpp 
	$(WEBIDL_BINDER) mylib.idl $(LIBDIR)glue

	printf '#include <cstddef>\n#include "../mylib.h"\n#include "glue.cpp"' > $(LIBDIR)glue_wrapper.cpp
	$(CC) $(LIBDIR)glue_wrapper.cpp -o $(LIBDIR)index.js \
		-s ASYNCIFY=1 \
		-s MODULARIZE \
		-s EXPORT_NAME="mylib" \
		--post-js $(LIBDIR)glue.js
		

clean:
	rm -rf $(LIBDIR)
