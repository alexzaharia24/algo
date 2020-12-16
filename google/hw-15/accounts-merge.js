// https://leetcode.com/problems/accounts-merge/

function accountsMerge(accounts) {
    return accountsMergeWithGraph(accounts);
}

function accountsMergeWithGraph(accounts) {
    // N = nr of emails
    // Time: O(N*logN) = O(N) graph creation + O(N*logN) sorting
    // Space: O(N)
    let adjMap = {};
    let result = [];
    let emailToName = {};

    let uniqueAccountEmails = [];
    for (let i = 0; i < accounts.length; i++) { // Time: O(N)
        let uniqueEmails = removeDuplicatesFromUnsorted(accounts[i].slice(1));
        uniqueAccountEmails[i] = uniqueEmails;
    }

    for (let i = 0; i < accounts.length; i++) {
        let uniqueEmails = uniqueAccountEmails[i];
        // Create edges between emails from the same account entry
        for (let k = 0; k < uniqueEmails.length; k++) { // Time: O(N)
            if (!adjMap[uniqueEmails[k]]) {
                adjMap[uniqueEmails[k]] = []
                emailToName[uniqueEmails[k]] = accounts[i][0];
            }
            if (k < uniqueEmails.length - 1) {
                adjMap[uniqueEmails[k]].push(uniqueEmails[k + 1]);
            }
            if (k > 0) {
                adjMap[uniqueEmails[k]].push(uniqueEmails[k - 1]);
            }
        }
    }

    let visited = {};
    for (let node of Object.keys(adjMap)) {
        if (!visited[node]) {
            result.push([emailToName[node]]);
            dfs(node, adjMap, visited, result);
            result[result.length - 1].sort();
        }
    }

    return result;
}

function dfs(node, adjMap, visited, result) {
    visited[node] = true;
    result[result.length - 1].push(node);
    for (let neighbor of adjMap[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adjMap, visited, result);
        }
    }
}

function removeDuplicatesFromUnsorted(a) {
    let map = {};
    for (let i = 0; i < a.length; i++) {
        map[a[i]] = i;
    }
    return Object.keys(map);
}

function accountsMergeBrute(accounts) {
    let result = [];
    let indexedNameToName = {};
    let indexedNameToEmails = {};
    for (let idx = 0; idx < accounts.length; idx++) {
        let acc = accounts[idx];
        let name = acc[0];
        let indexedName = name + "_" + idx;
        indexedNameToName[indexedName] = name;
        indexedNameToEmails[indexedName] = acc.slice(1);
        indexedNameToEmails[indexedName].sort();
        indexedNameToEmails[indexedName] = removeDuplicates(indexedNameToEmails[indexedName]);;
    }

    let mergedDone = false
    let indexedNames = Object.keys(indexedNameToEmails);
    while (!mergedDone) {
        let foundMatch = false;
        for (let i = 0; i < indexedNames.length - 1 && !foundMatch; i++) {
            for (let j = i + 1; j < indexedNames.length && !foundMatch; j++) {
                for (let email of indexedNameToEmails[indexedNames[j]]) {
                    if (indexedNameToEmails[indexedNames[i]].indexOf(email) !== -1) {
                        let a = indexedNameToEmails[indexedNames[i]];
                        let b = indexedNameToEmails[indexedNames[j]];
                        indexedNameToEmails[indexedNames[i]] = mergeWithoutDuplicates(a, b);
                        indexedNameToEmails[indexedNames[j]] = [];
                        foundMatch = true;
                    }
                }
            }
        }
        mergedDone = !foundMatch;
    }

    result = [];
    for (indexedName of indexedNames) {
        if (indexedNameToEmails[indexedName].length > 0) {
            result.push([indexedNameToName[indexedName], ...indexedNameToEmails[indexedName]]);
        }
    }

    return result;
}

function removeDuplicates(a) {
    // a is sorted
    let result = [a[0]];
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] !== a[i + 1]) {
            result.push(a[i + 1]);
        }
    }
    return result;
}

function mergeWithoutDuplicates(a, b) {
    let i = 0, j = 0;
    let result = [];
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            result.push(a[i]);
            i++;
        } else if (b[j] < a[i]) {
            result.push(b[j]);
            j++;
        } else {
            result.push(a[i]);
            i++; j++;
        }
    }

    while (i < a.length) {
        result.push(a[i]);
        i++;
    }

    while (j < b.length) {
        result.push(b[j]);
        j++;
    }
    return result;
}

function accountsMergeWithMap(accounts) {
    // Not working
    // Time: O(N*logN)
    let emailToIndexedName = {};
    let indexedNameToName = {};
    let indexedNameToEmails = {};
    for (let idx = 0; idx < accounts.length; idx++) {
        let acc = accounts[idx];
        let name = acc[0];
        let indexedName = name + "_" + idx;
        indexedNameToName[indexedName] = name;
        let accountExists = false;
        let existingAccount = null;
        for (let eIdx = 1; eIdx < acc.length; eIdx++) {
            let email = acc[eIdx];
            if (email in emailToIndexedName) {
                existingAccount = emailToIndexedName[email];
                if (existingAccount !== indexedName) {
                    accountExists = true;
                    // console.log("Exists: ", email, existingAccount)
                    // console.log(emailToIndexedName);
                    // console.log("----")
                    break;
                }
            } else {
                emailToIndexedName[email] = indexedName;
            }
        }

        if (accountExists) {
            // Add all emailToIndexedName to account
            for (let eIdx = 1; eIdx < acc.length; eIdx++) {
                let email = acc[eIdx];
                emailToIndexedName[email] = existingAccount;
            }
        }
    }

    for (let email of Object.keys(emailToIndexedName)) {
        let indexedName = emailToIndexedName[email];
        if (!indexedNameToEmails[indexedName]) {
            indexedNameToEmails[indexedName] = []
        }
        indexedNameToEmails[indexedName].push(email);
    }

    let result = [];
    for (let indexedName of Object.keys(indexedNameToEmails)) {
        indexedNameToEmails[indexedName].sort();
        let account = [];
        account.push(indexedNameToName[indexedName]);
        account.push(...indexedNameToEmails[indexedName]);
        result.push(account);
    }

    return result;
}

console.log(accountsMerge(
    [
        ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
        ["John", "johnsmith@mail.com", "john00@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"]]
));

