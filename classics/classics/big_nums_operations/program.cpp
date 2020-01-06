#include <iostream>
#include <fstream>
#include <math.h>
#include <vector>
#include <string>

using namespace std;

int compareNumberArrays(vector<int> a, vector<int> b) {
	if (a.size() > b.size()) return 1;
	else if (a.size() < b.size()) return -1;

	for (int i = 0; i < a.size(); i++) {
		if (a[i] > b[i]) return 1;
		else if (a[i] < b[i]) return -1;
	}

	return 0;
}

vector<int> sumNumberArrays(vector<int> a, vector<int> b) {
	
	reverse(a.begin(), a.end());
	reverse(b.begin(), b.end());

	int minSize, maxSize;
	vector<int> maxSizeArray;

	if (a.size() < b.size()) {
		minSize = a.size();
		maxSize = b.size();

		 maxSizeArray = b;
	}
	else {
		minSize = b.size();
		maxSize = a.size();

		maxSizeArray = a;
	}

	vector<int> sumArray(maxSize + 1);

	int s = 0, remainder = 0, i;
	for (i = 0; i < minSize; i++) {
		if (remainder > 0)
			sumArray[i] = remainder;

		int aux = a[i] + b[i];
		s = aux % 10;
		remainder = aux / 10;
		remainder += (sumArray[i] + s) / 10;
		sumArray[i] = (sumArray[i] + s) % 10;
	}
	if (maxSizeArray.size() > minSize) {
		for (i = minSize; i < maxSize; i++) {
			if (remainder > 0)
				sumArray[i] = remainder;

			remainder = (sumArray[i] + maxSizeArray[i]) / 10;
			sumArray[i] = (sumArray[i] + maxSizeArray[i]) % 10;
		}
	}

	sumArray[maxSize] = remainder;
	reverse(sumArray.begin(), sumArray.end());

	return sumArray;
}

vector<int> subtractNumberArrays(vector<int> a, vector<int> b) {
	int sign;

	vector<int> subtractor, subtracted;
	int relation = compareNumberArrays(a, b);
	if (relation == 1 || relation == 0) {
		subtractor = a;
		subtracted = b;
		sign = 1;
	}
	else {
		subtractor = b;
		subtracted = a;
		sign = -1;
	}

	vector<int> result(subtractor.size());

	reverse(subtractor.begin(), subtractor.end());
	reverse(subtracted.begin(), subtracted.end());

	for (int i = 0; i < subtracted.size(); i++) {
		int aux = subtractor[i] - subtracted[i];
		if (aux < 0) {
			int k = i + 1;
			bool borrowFinished = false;
			while (!borrowFinished && k < subtractor.size()) {
				subtractor[k] = (10 + subtractor[k] - 1) % 10;
				if (subtractor[k] != 9) {
					borrowFinished = true;
				}
				k++;
			}
			aux = (10 + subtractor[i] - subtracted[i]) % 10;
		}
		result[i] = aux;
	}

	for (int i = subtracted.size(); i < subtractor.size(); i++) {
		result[i] = subtractor[i];
	}

	int nonZeroDigitIndex;
	for (nonZeroDigitIndex = result.size() - 1; nonZeroDigitIndex >= 0; nonZeroDigitIndex--) {
		if (result[nonZeroDigitIndex] != 0) break;
	}
	if (nonZeroDigitIndex < result.size()) {
		result[nonZeroDigitIndex] *= sign;
	}

	reverse(result.begin(), result.end());

	return result;
}

vector<int> multiplyNumberArrays(vector<int> a, vector<int> b) {
	vector<int> result(a.size() + b.size() - 1);

	reverse(a.begin(), a.end());
	reverse(b.begin(), b.end());

	for (int i = 0; i < b.size(); i++) {
		vector<int> intermediary(a.size() + 1);
		int k = 0, surplus = 0, aux, digit;

		for (int j = 0; j < a.size(); j++) {
			intermediary[k] = surplus;
			aux = a[j] * b[i];
			surplus = aux / 10;
			digit = aux % 10;
			surplus = surplus + (intermediary[k] + digit) / 10;
			intermediary[k] = (intermediary[k] + digit) % 10;
			k++;
		}

		intermediary[k] = surplus;

		surplus = 0;
		for (int p = 0; p < k; p++) {
			result[p + i] += surplus;
			aux = result[p + i] + intermediary[p];
			surplus = aux / 10;
			digit = aux % 10;
			result[p + i] = digit;
		}
	}

	reverse(result.begin(), result.end());
	return result;
}

string numberArrayToString(vector<int> a)
{
    string str = "";
    for (int i = 0; i < a.size(); i++)
    {
        str += to_string(a[i]);
    }

    return str;
}

vector<int> stringToNumberArray(string a)
{
    vector<int> numberArray;
    for (int i = 0; i < a.size(); i++)
    {
        numberArray.push_back(a[i] - '0');
    }

	return numberArray;
}

int main(int argc, char* argv[])
{
    ifstream fin;
    fin.open("file.in");
	if (!fin.is_open()) {
		cout << "File does not exist." << "\n";
	}
    // file.in:
    // 1st line - 1st big number
    // 2nd line - 2nd big number
    // the numbers can have between 1 and 30 digits

    string a;
    string b;

    fin >> a >> b;
    fin.close();

    vector<int> A, B;
	A = stringToNumberArray(a);
	B = stringToNumberArray(b);
	
	//cout << numberArrayToString(sumNumberArrays(A, B)) << "\n";
	cout<<numberArrayToString(multiplyNumberArrays(A,B));

    cout << "\n";
    system("pause");

    return 0;
}
