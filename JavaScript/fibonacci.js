class Fibonacci {
    constructor() {
        this.calculated = {};
    }

    fibonacci(n) {
        if (n < 0) {
            throw new Error('Index was negative. No such thing as a negative index in a series.');
        } else if (n === 0 || n === 1) {
            return n;
        }

        if (this.calculated.hasOwnProperty(n)) {
            return this.calculated[n];
        }

        const result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
        this.calculated[n] = result;
        return result;
    }
}

function timeFibonacci(n) {
    const times = Array.from({ length: 10 }, () => {
        let result;
        const startTime = performance.now();
        try {
            const fibonacci = new Fibonacci();
            result = fibonacci.fibonacci(n);
        } catch (error) {
            console.error('An error occurred:', error);
            return 0;
        }

        const endTime = performance.now();
        const time = endTime - startTime;

        console.log(`Fibonacci time\t: ${time.toFixed(10)} ms ${result}`);

        return time;
    });

    const totalTime = times.reduce((a, b) => a + b, 0);
    const averageTime = totalTime / times.length;

    console.log(`\nAverage time\t: ${averageTime.toFixed(10)} ms`);
}

timeFibonacci(6000)