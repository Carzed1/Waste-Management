#define BLYNK_TEMPLATE_ID "TMPL3fbtYn2Ss"
#define BLYNK_TEMPLATE_NAME "AICTE Smart Dustbin"
#define BLYNK_AUTH_TOKEN "4yFXy4OQ6q70rzh5HoTSlV3jP4mkbPB8"

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <NewPing.h>

char auth[] = BLYNK_AUTH_TOKEN;
const int trigPin = 5;
const int echoPin = 12;
#define MAX_DISTANCE 200
const int ledPin = 2; // GPIO2 (or adjust to your LED pin)

char ssid[] = "Bitto";
char pass[] = "9278348561";

BlynkTimer timer;

NewPing sonar(trigPin, echoPin, MAX_DISTANCE);

int sensorThres = 100;
int distanceCm;
int resetDistance;

void setup() {
Serial.begin(9600);
Blynk.begin(auth, ssid, pass);
timer.setInterval(2500L, sendSensor);
pinMode(ledPin, OUTPUT);
}

void loop() {
// Wi-Fi Status LED
if (WiFi.status() == WL_CONNECTED) {
digitalWrite(ledPin, HIGH); // LED on when connected
delay(100);
digitalWrite(ledPin, LOW); // LED off for a brief moment
delay(100);
} else {
digitalWrite(ledPin, LOW); // LED off when disconnected
}

// Sensor readings and Serial output (always active)
delay(50);
distanceCm = sonar.ping_cm();
/*
if (distanceCm <= 7 && distanceCm != 0) {
resetDistance = 6 - distanceCm;
} else {
resetDistance = distanceCm;
}
*/
resetDistance = distanceCm;
// Continuous Serial Output (always print distance)
Serial.print("Distance: ");
Serial.print(distanceCm);
Serial.println(" cm");

Blynk.run(); // Keep Blynk running (data will be sent if connected)
timer.run();
}

void sendSensor() {
Serial.print("Sending to Blynk: ");
Serial.println(resetDistance);

if (Blynk.connected()) { // Check for Blynk connection
Blynk.virtualWrite(V0, resetDistance);
}
}