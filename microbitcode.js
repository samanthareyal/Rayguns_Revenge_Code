// **Helper Function to Stop Motors**
// This function stops both left and right motors by setting their speeds to zero.
function stopMotors() {
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 0);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 0);
}

// **Light Sensor Logic**
// This section uses light sensors to detect bright light and respond with specific movements.
if (pins.analogReadPin(AnalogPin.P0) > 150) {
    // Bright light detected on left sensor - turn left.
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 30);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 100);
    basic.pause(500); // Pause for the left turn.
} else if (pins.analogReadPin(AnalogPin.P2) > 150) {
    // Bright light detected on right sensor - turn right.
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 100);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 30);
    basic.pause(500); // Pause for the right turn.
} else if (pins.analogReadPin(AnalogPin.P1) > 150) {
    // Bright light detected on middle sensor - spin in place.
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 255);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 255);
    basic.pause(1000); // Pause for spin duration.
    stopMotors();
} else {
    // Default movement - move forward slowly.
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 50);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 50);
    basic.pause(500); // Pause for the slow movement.
}

// **Bumper Sensor Logic**
// This section uses the bumper sensor to detect collisions and respond with a dramatic spin.
if (pins.digitalReadPin(DigitalPin.P8) == 1) {
    // Bumper is pressed - stop and reverse.
    stopMotors();
    basic.showIcon(IconNames.Confused); // Display "confused" icon.
    basic.pause(500); // Pause to simulate a reaction.
    
    // Reverse slightly.
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 50);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 50);
    basic.pause(500); // Pause during reverse movement.
    
    // Perform a dramatic spin.
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 255);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 255);
    basic.pause(1000); // Pause for spin duration.
    stopMotors();
}

// **Main Dance Routine**
// This section contains the sequence of choreographed moves performed by the robot.
basic.forever(function () {
    // Enable motors for movement.
    motobit.enable(MotorPower.On);
    
    // **Move 1: Drive Forward**
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 80);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 80);
    basic.pause(1000); // Drive forward for 1 second.
    stopMotors();
    basic.pause(500); // Short pause before the next move.

    // **Move 2: Zig-Zag**
    for (let index = 0; index < 3; index++) {
        // Alternate between right and left turns.
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 70);
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 30);
        basic.pause(500);
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 30);
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 70);
        basic.pause(500);
    }
    stopMotors();
    basic.pause(500);

    // **Move 3: Spin in Place**
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 255);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 255);
    basic.pause(3000); // Spin for 3 seconds.
    stopMotors();
    basic.pause(500);

    // Add servo movements for additional flair during the spin.
    pins.servoWritePin(AnalogPin.P15, 0); // Servo to 0 degrees.
    pins.servoWritePin(AnalogPin.P16, 180); // Servo to 180 degrees.
    basic.pause(500);
    pins.servoWritePin(AnalogPin.P15, 180); // Servo to 180 degrees.
    pins.servoWritePin(AnalogPin.P16, 0); // Servo to 0 degrees.
    basic.pause(500);

    // **Move 4: Shake (Wiggle)**
    for (let index = 0; index < 5; index++) {
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 150);
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 150);
        basic.pause(200);
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 150);
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 150);
        basic.pause(200);
    }
    stopMotors();
    basic.pause(500);

    // **Move 5: Diagonal Slide**
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 70);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 100);
    basic.pause(1000); // Slide for 1 second.
    stopMotors();
    basic.pause(300);

    // **Move 6: Figure-Eight**
    for (let index = 0; index < 2; index++) {
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 100);
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 50);
        basic.pause(1000); // Curve to the right.
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 50);
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 100);
        basic.pause(1000); // Curve to the left.
    }
    stopMotors();
    basic.pause(500);

    // **Finale: Slow Spin and LED Pose**
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 100);
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 100);
    basic.pause(4000); // Slow spin for 4 seconds.
    stopMotors();
    basic.showIcon(IconNames.Heart); // Display heart icon for the finale.
    pins.servoWritePin(AnalogPin.P15, 0);
    pins.servoWritePin(AnalogPin.P16, 180);
    basic.pause(500);
    pins.servoWritePin(AnalogPin.P15, 180);
    pins.servoWritePin(AnalogPin.P16, 0);
    basic.pause(500);

    // Disable motors after completing the routine.
    motobit.enable(MotorPower.Off);
});
