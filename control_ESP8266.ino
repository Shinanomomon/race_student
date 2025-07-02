#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>

SoftwareSerial microbitSerial(D7, D8);  // RX, TX

const char* ssid = "RNN_SEVER_2.4G";       // ใส่ Wi-Fi ของคุณ
const char* password = "rnnadmin";   // ใส่รหัส Wi-Fi

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  microbitSerial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected! IP address: ");
  Serial.println(WiFi.localIP());  // 👉 ใช้ IP นี้ในหน้าเว็บ

  // รับคำสั่งผ่าน /cmd?d=U
  server.on("/cmd", []() {
  if (server.hasArg("d")) {
    String dir = server.arg("d");
    microbitSerial.print("#" + dir);
    server.sendHeader("Access-Control-Allow-Origin", "*");  // ✅ แก้ตรงนี้
    server.send(200, "text/plain", "Sent " + dir);
  } else {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(400, "text/plain", "Missing parameter");
  }
});


  server.begin();
}

void loop() {
  server.handleClient();
}
