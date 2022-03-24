#include <string>

typedef struct mystruct {
	int the_int;
	long the_long;
} t_mystruct;

class Binding {
public:
	Binding() = default;

	int add(int a, int b)
	{
		return a+b;
	}

	int get_mystruct_value(const mystruct *ms)
	{
		return ms->the_int + ms->the_long;
	}
};
