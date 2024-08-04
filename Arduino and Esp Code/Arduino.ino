#include <Servo.h>

Servo myservo;  
int trigPin = 5;    
int echoPin = 6;   
int servoPin = 7;
int led = 10;
long duration, dist, average;   
long aver[3];
int pos = 140; 

void setup() {
  Serial.begin(9600);
  myservo.attach(servoPin); 
  pinMode(trigPin, OUTPUT);  
  pinMode(echoPin, INPUT);
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);
}

void measure() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(15);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  dist = (duration / 2) / 29.1; 
}

void moveServo() {
  for (pos = 140; pos >= 40; pos -= 5) {
    myservo.write(pos);
    delay(15);
  }
  delay(3000); 
  for (pos = 40; pos <= 140; pos += 5) {
    myservo.write(pos);
    delay(15);
  }
  delay(3000);
}

void loop() {
  for (int i = 0; i <= 2; i++) { 
    measure();
    aver[i] = dist;
    delay(10);
  }
  dist = (aver[0] + aver[1] + aver[2]) / 3;

  if (dist < 50) {
    digitalWrite(led, HIGH); // Indicate servo movement
    moveServo();
    digitalWrite(led, LOW);
  }

  Serial.print(dist);
  Serial.println(" cm"); // Better readability in the serial output
}