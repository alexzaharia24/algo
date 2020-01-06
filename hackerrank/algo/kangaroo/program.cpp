#include <iostream>
#include <fstream>
#include <math.h>

using namespace std;

string solve(int x1, int v1, int x2, int v2)
{
    if (v1 == v2)
    {
        return "NO";
    }
    double nrOfJumps = ((float)(x2 - x1) / (v1 - v2));

    if (nrOfJumps >= 0 && ceil(nrOfJumps) == nrOfJumps)
    {
        return "YES";
    }
    return "NO";
}

int main()
{
    ifstream fin;

    int x1, v1, x2, v2;

    fin.open("file.in");
    fin >> x1 >> v1 >> x2 >> v2;

    cout << solve(x1, v1, x2, v2);

    cout << "\n";
    system("pause");

    return 0;
}
