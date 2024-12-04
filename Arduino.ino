#include <Servo.h>

Servo miServo;  // Crea un objeto Servo
int servoPin = 9;  // Pin PWM para el servo
int posicion = 0;
int incremento = 1;

int velocidadValor = 0;  // Variable global para almacenar la velocidad

void setup() {
    Serial.begin(9600);  // Inicializa el puerto serial
    pinMode(LED_BUILTIN, OUTPUT);  // Configura el LED incorporado como salida
    miServo.attach(servoPin);  // Conecta el servo al pin 9
    Serial.println("Esperando datos...");
}

void loop() {
    // Si hay datos disponibles en el puerto serial
    if (Serial.available() > 0) {
        String velocidad = Serial.readStringUntil('\n');  // Lee hasta un salto de línea
        velocidadValor = velocidad.toInt();  // Convierte la velocidad a entero
    }

    // Escala la velocidad de 18-47 a 0-180 grados para el servo
    int vel = map(velocidadValor, 18, 47, 100, 10);
    posicion += incremento;

    if (posicion <= 0 || posicion >= 180) {
      incremento = -incremento;
    }

    miServo.write(posicion);
    delay(vel);
    // Mapea la velocidad a un tiempo de retraso más pequeño para velocidades más altas
    // La velocidad de 18 (mínima) tendrá el retraso más largo y 47 (máxima) el más corto
    //int velocidadMovimiento = map(velocidadValor, 18, 47, 30, 5);  // Ajusta el "delay" en milisegundos

    // Mueve el servo a la nueva posición gradualmente
    //for (int pos = 0; pos <= servoPosicion; pos++) {
        //miServo.write(pos);  // Mueve el servo a la nueva posición
        //delay(velocidadMovimiento);  // Controla la velocidad del movimiento
    
}