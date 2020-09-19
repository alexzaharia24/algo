function initializeMatrix(rows, cols, value) {
    return new Array(rows).fill().map(() => Array(cols).fill(value))
}

// Note: Not using new Array(rows).fill(new Array(cols).fill(value)) because each row will reference the same array