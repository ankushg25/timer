import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    timer = null;
    countDown = 0;
    paused = false;

    countDownInput = new FormControl(0, [Validators.required]);

    constructor() {
        this.timer = null;
    }

    start() {
        this.countDown = this.countDownInput.value * 60;
        this.runTimer(this.countDown);
    }

    runTimer(duration: number) {
        this.countDown = duration;

        // Check for countdown < 0
        if (this.countDown <= 0) { return; }

        this.countDownInput.disable();

        // Set Interval
        this.timer = setInterval(() => {
            if (this.countDown > 0) { this.countDown--; }
            else {
                this.reset();
                window.alert("Timer has expired !")
            }
        }, 1e3);
    }

    pause() {
        // Toggle Paused Button
        this.paused = !this.paused;

        if (this.paused) {
            // Enable Input
            this.countDownInput.enable();

            // Reset Timers
            clearInterval(this.timer);
        } else {
            // Disable the input
            this.countDownInput.disable();

            // Resume the timer
            this.runTimer(this.countDown);
        }
    }

    reset() {
        this.countDown = 0;
        clearInterval(this.timer);
        this.timer = null;
        this.paused = false;
        this.countDownInput.enable();
        this.countDownInput.setValue(this.countDown);
    }

    get displayTimer() {
        return this.countDown * 1e3;
    }

}
