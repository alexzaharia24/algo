function solve(a) {
    return solveWithPointers(a);
}

function solveWithPointers(nums) {
    // O(n) time
    // O(1) space
    let productBefore = 1, productAfter = 1;
    let productExceptSelf = [];

    for (let i = 0; i < nums.length; i++) {
        productExceptSelf.push(productBefore);
        productBefore *= nums[i];
    }

    for (let i = nums.length - 1; i >= 0; i--) {
        productExceptSelf[i] *= productAfter;
        productAfter *= nums[i];
    }

    return productExceptSelf;
}

function solveWithBeforeAndAfterProduct(nums) {
    // O(n) time
    // O(n) space
    let productBefore = [], productAfter = [];
    let productExceptSelf = [];
    let product;

    product = 1;
    productBefore.push(1); // First product is 1
    for (let i = 1; i < nums.length; i++) {
        product *= nums[i - 1];
        productBefore.push(product);
    }

    product = 1;
    productAfter.push(1); // Last product is 1
    for (let i = nums.length - 2; i >= 0; i--) {
        product *= nums[i + 1];
        productAfter.push(product);
    }
    productAfter = productAfter.reverse(); // O(n)

    for (let i = 0; i < nums.length; i++) {
        productExceptSelf.push(productBefore[i] * productAfter[i]);
    }

    return productExceptSelf;
}

console.log(solve([1, 2, 3, 4]))