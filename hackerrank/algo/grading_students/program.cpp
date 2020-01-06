#include <iostream>
#include <fstream>
#include <math.h>

using namespace std;

int roundGrade(int grade) {
    if(grade < 38) return grade;
    int nextMultipleOf5 = ((grade / 5) + 1) * 5;
    if(nextMultipleOf5 - grade < 3) {
        grade = nextMultipleOf5;
    }
    return grade;
}

int* roundGrades(int nrStudents, int* grades) {
    int* result = new int[nrStudents];

    for(int i=0; i<nrStudents; i++) {
        result[i] = roundGrade(grades[i]);
    }

    return result;
}

int main()
{
    ofstream fout;
    ifstream fin;

    int nrStudents;
    int *grades = new int[30];

    fin.open("file.in");
    fin >> nrStudents;
    for (int i = 0; i < nrStudents; i++)
    {
        fin >> grades[i];
    }

    int* roundedGrades = roundGrades(nrStudents, grades);

    for(int i=0; i<nrStudents; i++) {
        cout<<roundedGrades[i]<<"\n";
    }

    // cout<<"\n";
    system("pause");

    return 0;
}
