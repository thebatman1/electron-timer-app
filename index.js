const moment = require('moment');
const {
    getTimerValue,
    setTimerState,
    setTimerValue,
    TIMER_STATES,
    clearTimer,
    setDayCount,
    getDayCount,
    getTimerState,
} = require('./timer');

const timerClock = document.getElementById('timer-clock');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

const MILLISECONDS_IN_DAY = 86400000;

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

const safeDivide = (num, denom) => {
    if (num === 0) {
        return 0;
    }
    if (denom === 0) {
        return 0;
    }
    return Math.floor(num / denom);
}

/**
 * A function to get the time elapsed since the provided starting point 
 * @param {number} start The starting reference point
 * @returns {string} The time difference
 */
const getFormattedTime = (start) => {
    const elapsedMs = start;
    const ms = elapsedMs % 1000;
    const tempS = safeDivide(elapsedMs, 1000);
    const s = tempS % 60; 
    const tempMin = safeDivide(tempS, 60);
    const m = tempMin % 60;
    const tempH = safeDivide(tempMin, 60);
    const h = tempH % 24;
    const dayCount = safeDivide(tempH, 24);
    console.log(h, m, s, ms);
    if (dayCount > 0 && dayCount > getDayCount()) {
        setDayCount(elapsedMs / MILLISECONDS_IN_DAY);
    }
    return time`${h}:${m}:${s}.${ms}`;
}

window.onStartClicked = () => {
    setTimerState(TIMER_STATES.RUNNING);
    const base = getTimerValue();
    let newTime = base;
    const timerId = this.setInterval(() => {
        newTime += 1;
        setTimerValue(newTime);
        const elapsedTime = getFormattedTime(newTime);
        timerClock.innerHTML = elapsedTime;
        if (getTimerState() !== TIMER_STATES.RUNNING) {
            clearInterval(timerId);
        }
    }, 1);
}

window.onStopClicked = () => {
    setTimerState(TIMER_STATES.STOPPED)
}

window.onResetClicked = () => {
    clearTimer();
    timerClock.innerHTML = getFormattedTime(getTimerValue());
}
