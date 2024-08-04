# Smart Waste Management System

This project aims to revolutionize traditional waste management using IoT technologies. Our smart waste management system optimizes waste collection processes, enhances environmental sustainability, and reduces operational costs.

## Key Features

**Real-Time Monitoring**: Utilizes ESP8266 microcontrollers and ultrasonic sensors to detect waste levels in bins.

**Automated Operations**: Arduino-controlled servo motors automatically open and close bin lids based on detected waste levels.

**Data-Driven Optimization**: Central monitoring station collects and analyzes data to plan optimized waste collection routes and schedules.

**User-Friendly Interface:** Web app provides real-time bin status updates and notifications for waste management authorities.

## Technical Details

### Components: 

* ESP8266
* HC-SR04 Ultrasonic Sensors
* Arduino Uno
* Servo Motor SG90.
* 9V Battery or Power Bank w/ USB
* Jumper Wires
* Waste Bin

### System Design 
<br/>

**ESP8266 and Ultrasonic Setup:**
<br/>

![esp32_ultrasonic_setup](https://github.com/user-attachments/assets/ab23f257-1143-4d2d-a0e0-70817f6925e7)

<br/>


* Connection Setup: The ultrasonic sensor (HC-SR04) connects to the ESP8266 with VCC to 3V3, GND to GND, Trig to GPIO5 (D1), and Echo to GPIO4 (D2).

* Distance Measurement: The ESP8266 sends a pulse via the Trig pin, measures the echo return time, and calculates the distance to the garbage.

* Level Detection: The distance measurement determines the garbage level in the dustbin.

* Data Transmission: The ESP8266 sends the garbage level data to a web interface and the Blynk app for real-time monitoring.

  <br/>
**Arduino and Servo Setup:**
  <br/>

![arduino_servo_setup](https://github.com/user-attachments/assets/d1bee27d-0687-4173-bfcb-592e19eec2cf)

<br/>


* Motion Detection: The ultrasonic sensor emits pulses and measures the time it takes for the echoes to return, calculating the distance to an object.

* Threshold Check: If an object (e.g., a hand) is detected within a specified distance, the Arduino interprets this as motion near the dustbin.

* Lid Opening: The Arduino sends a signal to the servo motor, causing it to rotate and open the lid of the dustbin.

* Delay and Lid Closing: After a short delay (e.g., 5 seconds), the Arduino sends another signal to the servo motor to close the lid.

* System Reset: The system returns to monitoring mode, ready to detect new motion and repeat the process.
  
## Environmental Benefits
* Reduced Emissions
* Waste Reduction
* Sustainable Design
* Improved Resource Allocation


## [Youtube Link of the Video](https://youtu.be/m8GbSzopF6I?si=t4D8d3IGciDPF8yq)

