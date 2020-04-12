
/**
 * Time template string formatting function
 * @param {string[]} strings The array of words for the template string
 * @param {number} h The value of hour
 * @param {number} m The value of minute
 * @param {number} s The value of seconds
 * @param {number} ms The value of milliseconds
 */
const time = (strings, h, m, s, ms) => {
    const hString = h.toString();
    const hh = hString.length === 2 ? hString : `0${hString}`;
    const mString = m.toString();
    const mm = mString.length === 2 ? mString : `0${mString}`;
    const sString = s.toString();
    const ss = sString.length === 2 ? sString : `0${sString}`;
    const msString = ms.toString();
    let SSS;
    if (msString.length === 1) {
        SSS = `00${msString}`;
    } else if (msString.length === 2) {
        SSS = `0${msString}`;
    } else {
        SSS = msString;
    }
    return `${hh}:${mm}:${ss}.${SSS}`;
}

/**
 * Safely divides two numbers and takes care of divide by zero errors
 * @param {number} num Numerator
 * @param {number} denom Denominator
 * @returns {number} The quotient if num/denom is possible, else zero
 */
const safeDivide = (num, denom) => {
    if (num === 0) {
        return 0;
    }
    if (denom === 0) {
        return 0;
    }
    return Math.floor(num / denom);
}

module.exports = {
    time,
    safeDivide,
}
