#include <iostream>
#include <fstream>
#include <math.h>
#include <vector>

using namespace std;

long long cmmdc(long long a, long long b)
{
    if ((a < 0 && b < 0))
    {
        return 1;
    }kklk
    else if (a == 0)
    {
        return b;
    }
    else if (b == 0)
    {
        return a;
    }
    while (a != b)
    {
        if (a > b)
            a = a - b;
        else
            b = b - a;
    }

    if(a < 0) return 1;
    return a;
}

long long cmmmc(long long a, long long b)
{
    long long divisor = cmmdc(a, b);
    if (divisor > 0)
    {
        return (a * b) / divisor;
    }
    return 0;
}

long long cmmdcList(vector<int> a)
{
    if (a.size() == 0)
    {
        return 0;
    }
    if (a.size() == 1)
    {
        return a[0];
    }

    long long gcd = cmmdc(a[0], a[1]);
    for (int i = 2; i < a.size(); i++)
    {
        gcd = cmmdc(gcd, (long long)a[i]);
    }

    return gcd;
}

long long listProduct(vector<int> a)
{
    long long product = 1;
    if (a.size() == 0)
        return 0;
    if (a.size() >= 1)
        product = a[0];

    for (int i = 1; i < a.size(); i++)
    {
        product *= a[i];
    }

    return product;
}

double cmmmcList(vector<int> a)
{
    if (a.size() == 0)
    {
        return 0;
    }
    if (a.size() == 1)
    {
        return a[0];
    }

    long hcm = cmmmc(a[0], a[1]);
    for (int i = 2; i < a.size(); i++)
    {
        hcm = cmmmc(hcm, a[i]);
    }

    return hcm;
}

int getTotalX_withCmmmc(vector<int> a, vector<int> b)
{
    int gcd = cmmdcList(b);
    int hcm = cmmmcList(a);
    int nrOfDivisors = 0;

    cout << gcd << "\n"
         << hcm << "\n";
    int factor = gcd / hcm;
    for (int i = 1; i <= factor; i++)
    {
        int divisor = i * hcm;
        if ((gcd % divisor) == 0)
            nrOfDivisors++;
    }

    return nrOfDivisors;
}

bool everyListElementIsFactor(vector<int> a, int element) {
    for(int i=0; i<a.size(); i++) {
        if(element % a[i] != 0) {
            return false;
        }
    }   

    return true;
}

int getTotalX(vector<int> a, vector<int> b)
{
    int gcd = cmmdcList(b);
    int nrOfDivisors = 0;
    vector<int> divisors;

    int biggest = a[0];
    for(int i=1; i<a.size(); i++) {
        if(a[i] > biggest) {
            biggest = a[i];
        }
    }

    for(int i=biggest; i<=100; i++) {
        if(everyListElementIsFactor(a, i) && (gcd % i == 0)) {
            divisors.push_back(i);
            nrOfDivisors++;
        }
    }

    return nrOfDivisors;
}

int main()
{
    ifstream fin;
    fin.open("file.in");

    int n, m, x;
    fin >> n >> m;

    vector<int> a, b;

    for (int i = 0; i < n; i++)
    {
        fin >> x;
        a.push_back(x);
    }

    for (int i = 0; i < m; i++)
    {
        fin >> x;
        b.push_back(x);
    }

    fin.close();

    cout << getTotalX(a, b);

    cout << "\n";
    system("pause");

    return 0;
}
