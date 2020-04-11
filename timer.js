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
    console.log(value);
    timer = {
        ...timer,
        value,
    };
};

const getTimerValue = () => timer.value;

const setTimerState = (state) => {
    console.log(state);
    timer = {
        ...timer,
        state,
    };
};

const clearTimer = () => {
    console.log('Inside clear timer');
    timer = {
        ...timer,
        dayCount: 0,
        value: 0,
        state: TIMER_STATES.RESET,
    }
}

const setDayCount = (dayCount) => {
    timer = {
        ...timer,
        dayCount,
    };
};

const getDayCount = () => timer.dayCount;

const getTimerState = () => timer.state;

module.exports = {
    TIMER_STATES,
    getTimerValue,
    setTimerValue,
    setTimerState,
    getTimerState,
    clearTimer,
    setDayCount,
    getDayCount,
}
