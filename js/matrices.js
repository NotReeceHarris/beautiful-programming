const multiplyMatrices = (matrix1, matrix2) => {
    const [matrix1Rows, matrix1Columns] = [matrix1.length, matrix1[0].length];
    const [matrix2Rows, matrix2Columns] = [matrix2.length, matrix2[0].length];

    if (matrix1Columns !== matrix2Rows) {
        throw new Error('The number of columns in the first matrix must be equal to the number of rows in the second matrix.');
    }

    const result = Array(matrix1Rows).fill().map(() => Array(matrix2Columns).fill(0));

    for (let i = 0; i < matrix1Rows; i++) {
        for (let j = 0; j < matrix2Columns; j++) {
            for (let k = 0; k < matrix1Columns; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

const addMatrices = (matrix1, matrix2) => {
    const [matrix1Rows, matrix1Columns] = [matrix1.length, matrix1[0].length];
    const [matrix2Rows, matrix2Columns] = [matrix2.length, matrix2[0].length];

    if (matrix1Rows !== matrix2Rows || matrix1Columns !== matrix2Columns) {
        throw new Error('The matrices must have the same dimensions.');
    }

    const result = Array(matrix1Rows).fill().map(() => Array(matrix1Columns).fill(0));

    for (let i = 0; i < matrix1Rows; i++) {
        for (let j = 0; j < matrix1Columns; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }

    return result;
}

const divideMatrices = (matrix1, matrix2) => {
    const [matrix1Rows, matrix1Columns] = [matrix1.length, matrix1[0].length];
    const [matrix2Rows, matrix2Columns] = [matrix2.length, matrix2[0].length];

    if (matrix1Columns !== matrix2Columns || matrix2Rows !== matrix2Columns) {
        throw new Error('Matrix2 must be a square matrix with the same x dimension as matrix1.');
    }

    const result = Array(matrix1Rows).fill().map(() => Array(matrix1Columns).fill(0));

    for (let i = 0; i < matrix1Rows; i++) {
        for (let j = 0; j < matrix1Columns; j++) {
            if (matrix2[i][j] === 0) {
                throw new Error('Division by zero is not allowed.');
            }
            result[i][j] = matrix1[i][j] / matrix2[i][j];
        }
    }

    return result;
}

const transposeMatrix = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const transposedMatrix = Array.from({ length: numCols }, () => Array(numRows));

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            transposedMatrix[j][i] = matrix[i][j];
        }
    }

    return transposedMatrix;
}


const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const matrix2 = [
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18],
];

const transposedMatrix2 = transposeMatrix(matrix2);

const result = {
    matrix1,
    matrix2,
    multiply: multiplyMatrices(matrix1, transposedMatrix2),
    add: addMatrices(matrix1, matrix2),
    divide: divideMatrices(matrix1, matrix2),
};

console.log(result);