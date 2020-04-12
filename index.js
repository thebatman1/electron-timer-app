const {
    startTimer,
    stopTimer,
    clearTimer,
} = require('./timer');

/**
 * Function to disable the given buttons
 * @param  {...HTMLButtonElement} buttons The buttons to be disabled
 */
const disableButtons = (...buttons) => {
    buttons.forEach((button) => { button.disabled = true; });
}

/**
 * Function to enable the given buttons
 * @param  {...HTMLButtonElement} buttons The buttons to be enabled 
 */
const enableButtons = (...buttons) => {
    buttons.forEach((button) => { button.disabled = false; });
}


const timerClock = document.getElementById('timer-clock');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const extraInformation = document.getElementById('extra-information')

updateUI = ({ value, dayCount }) => {
    timerClock.innerHTML = value;
    if (dayCount > 0) {
        extraInformation.innerHTML = `The timer is running for ${dayCount} day(s).`
    }
};

window.onload = () => {
    disableButtons(stopButton, resetButton);
}

window.onStartClicked = () => {
    startTimer(updateUI);
    disableButtons(startButton);
    enableButtons(stopButton, resetButton);
}

window.onStopClicked = () => {
    stopTimer(updateUI);
    enableButtons(startButton, resetButton);
    disableButtons(stopButton);
}

window.onResetClicked = () => {
    clearTimer(updateUI);
    disableButtons(resetButton, stopButton);
    enableButtons(startButton);
}
