// https://leetcode.com/problems/knight-probability-in-chessboard/

function knightProbability(N, k, r, c) {
    return knightProbabilityForwardDP(N, k, r, c);
}

function knightProbabilityForwardDP(N, k, r, c) {
    // Time: O(N^2 * k)
    // Space: O(N^2 * k)
    // dp[i][j][k] = probability of reaching position (i,j) after k moves
    // dp[i][j][k] = the combined probabilities from a previous move to reach position (i,j). (if a previous dp[a][b][k-1] is a valid position and is different than 0 then we can reach (i,j) from it, (a,b) being a previous position of the knight on the board)
    let dp = new Array(N).fill()
        .map(() => new Array(N)
            .fill()
            .map(() => new Array(k + 1).fill(0)));

    dp[r][c][0] = 1;
    for (let move = 0; move <= k; move++) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                // We have 8 possible ways to reach (i,j)position from move k
                let nextPositions = [
                    [i + 1, j + 2], [i + 1, j - 2],
                    [i + 2, j - 1], [i + 2, j + 1],
                    [i - 1, j - 2], [i - 1, j + 2],
                    [i - 2, j - 1], [i - 2, j + 1]
                ]

                for (let pos of nextPositions) {
                    
                    if (isPositionValid(pos[0], pos[1], N)) {
                        dp[pos[0]][pos[1]][move + 1] += ((1/8) * dp[i][j][move]); // We add the probability to reach the next position to its dp[][][]
                    }
                }
            }
        }
    }

    // We add the probabilities for reaching any position after k moves
    let totalProbability = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            totalProbability += dp[i][j][k];
        }
    }

    return totalProbability; // Don't need to divide this by total number of positions (N*N) because that would give us the average probability to reach a position after k moves. 
}

function knightProbabilityBackwardsDP(N, k, r, c) {
    // Time: O(N^2 * k)
    // Space: O(N^2 * k)
    // dp[i][j][k] = probability of reaching position (i,j) after k moves
    // dp[i][j][k] = the combined probabilities from a previous move to reach position (i,j). (if a previous dp[a][b][k-1] is a valid position and is different than 0 then we can reach (i,j) from it, (a,b) being a previous position of the knight on the board)
    let dp = new Array(N).fill()
        .map(() => new Array(N)
            .fill()
            .map(() => new Array(k + 1).fill(0)));

    dp[r][c][0] = 1;
    for (let move = 1; move <= k; move++) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                // We have 8 possible ways to reach (i,j) position from move k-1
                let prevPossiblePosition = [
                    [i + 1, j + 2], [i + 1, j - 2],
                    [i + 2, j - 1], [i + 2, j + 1],
                    [i - 1, j - 2], [i - 1, j + 2],
                    [i - 2, j - 1], [i - 2, j + 1]
                ]

                let probability = 0;
                for (let pos of prevPossiblePosition) {
                    if (isPositionValid(pos[0], pos[1], N)) {
                        let prevProbability = dp[pos[0]][pos[1]][move - 1];
                        probability += (1 / 8) * prevProbability; // We add the probabilities because they are independent events. And divide by 8 because there are 8 ways of reaching this position.
                        // Another way to look at it is that on position dp[pos[0]][pos[1]][move-1] you have proability P and then you have 8 different ways to move the knight => P/8 probability for each move => we add this probability to dp[i][j][move] and other 7 from the other possible positions
                    }
                }

                dp[i][j][move] = probability;
            }
        }
    }

    // We add the probabilities for reaching any position after k moves
    let totalProbability = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            totalProbability += dp[i][j][k];
        }
    }

    return totalProbability; // Don't need to divide this by total number of positions (N*N) because that would give us the average probability to reach a position after k moves. 
}

function isPositionValid(i, j, N) {
    return i >= 0 && i < N && j >= 0 && j < N;
}

console.log(knightProbability(3, 2, 0, 0));