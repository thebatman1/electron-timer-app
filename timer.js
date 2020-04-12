const { safeDivide, time } = require('./utils');

const MILLISECONDS_IN_DAY = 86400000;

const TIMER_STATES = {
    RESET: 'reset',
    RUNNING: 'running',
    STOPPED: 'stopped',
};

let timer = {
    dayCount: 0,
    value: 0, 
    state: TIMER_STATES.RESET,
};

const setTimerValue = (value) => {
    timer = {
        ...timer,
        value,
    };
};

const getTimerValue = () => timer.value;

const setTimerState = (state) => {
    timer = {
        ...timer,
        state,
    };
};

const getTimerState = () => timer.state;

const setDayCount = (dayCount) => {
    timer = {
        ...timer,
        dayCount,
    };
};

const getDayCount = () => timer.dayCount;

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
    if (dayCount > 0 && dayCount > getDayCount()) {
        setDayCount(elapsedMs / MILLISECONDS_IN_DAY);
    }
    return time`${h}:${m}:${s}.${ms}`;
}

/**
 * A function to start the timer
 * @param {function} callback The callback function to update the ui
 */
const startTimer = (callback) => {
    setTimerState(TIMER_STATES.RUNNING);
    const base = getTimerValue();
    let newTime = base;
    let newBaseTime = Date.now();
    const timerId = setInterval(() => {
        lastNewBaseTime = newBaseTime;
        newBaseTime = Date.now();
        newTime += newBaseTime - lastNewBaseTime;
        setTimerValue(newTime);
        const elapsedTime = getFormattedTime(newTime);
        callback({
            value: elapsedTime,
            dayCount: getDayCount(),
        });
        if (getTimerState() !== TIMER_STATES.RUNNING) {
            clearInterval(timerId);
        }
    }, 1);
};

/**
 * A function to stop the timer
 * @param {function} callback The callback function to update the UI
 */
const stopTimer = (callback) => {
    setTimerState(TIMER_STATES.STOPPED);
    callback({
        value: getFormattedTime(getTimerValue()),
        dayCount: getDayCount(),
    });
}

/**
 * A function to clear the timer
 * @param {function} callback The callback function to update the UI
 */
const clearTimer = (callback) => {
    timer = {
        ...timer,
        dayCount: 0,
        value: 0,
        state: TIMER_STATES.RESET,
    }
    callback({
        value: getFormattedTime(getTimerValue()),
        dayCount: getDayCount(),
    });
}

module.exports = {
    startTimer,
    stopTimer,
    clearTimer,
}
