// Advanced Mathematical Operations
function factorial(n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

function fibonacci(n) {
    let a = 0, b = 1, temp;
    for (let i = 0; i < n; i++) {
        temp = a;
        a = b;
        b = temp + b;
    }
    return a;
}

function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if (num % i === 0) return false;
    return num > 1;
}

function solveQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return `The roots are ${x1} and ${x2}`;
    } else if (discriminant === 0) {
        const x = -b / (2 * a);
        return `The root is ${x}`;
    } else {
        return "No real roots";
    }
}

// Unit Conversion
const unitConversions = {
    "km_to_miles": (km) => km * 0.621371,
    "miles_to_km": (miles) => miles * 1.60934,
    "celsius_to_fahrenheit": (c) => (c * 9/5) + 32,
    "fahrenheit_to_celsius": (f) => (f - 32) * 5/9,
    "kg_to_lbs": (kg) => kg * 2.20462,
    "lbs_to_kg": (lbs) => lbs * 0.453592
};

// Date and Time Operations
function getDaysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
    return diffDays;
}

function getNextDayOfWeek(dayName) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date();
    const dayIndex = days.indexOf(dayName.toLowerCase());
    if (dayIndex === -1) return "Invalid day name";
    const nextDay = new Date(today.getTime() + (7 + dayIndex - today.getDay()) % 7 * 24 * 60 * 60 * 1000);
    return nextDay.toDateString();
}

// Advanced String Operations
function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function reverseWords(str) {
    return str.split(' ').map(word => word.split('').reverse().join('')).join(' ');
}

// Process Logic Commands
function processLogicCommand(command) {
    const parts = command.split(' ');
    switch (parts[0].toLowerCase()) {
        case 'factorial':
            return `Factorial of ${parts[1]} is ${factorial(parseInt(parts[1]))}`;
        case 'fibonacci':
            return `Fibonacci number at position ${parts[1]} is ${fibonacci(parseInt(parts[1]))}`;
        case 'prime':
            return `${parts[1]} is ${isPrime(parseInt(parts[1])) ? 'prime' : 'not prime'}`;
        case 'quadratic':
            return solveQuadratic(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
        case 'convert':
            const conversionType = `${parts[1]}_to_${parts[3]}`;
            if (unitConversions[conversionType]) {
                return `${parts[2]} ${parts[1]} is ${unitConversions[conversionType](parseFloat(parts[2]))} ${parts[3]}`;
            }
            return "Conversion not supported";
        case 'daysbetween':
            return `Days between ${parts[1]} and ${parts[2]} is ${getDaysBetweenDates(new Date(parts[1]), new Date(parts[2]))}`;
        case 'nextday':
            return `Next ${parts[1]} is on ${getNextDayOfWeek(parts[1])}`;
        case 'wordcount':
            return `Word count: ${countWords(parts.slice(1).join(' '))}`;
        case 'reversewords':
            return `Reversed words: ${reverseWords(parts.slice(1).join(' '))}`;
        default:
            return "Unknown command";
    }
}

// Export the function to be used in main.js
window.processLogicCommand = processLogicCommand;
