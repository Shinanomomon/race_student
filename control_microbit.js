// เมื่อได้รับคำสั่งลงท้ายด้วย #//espcontrol speed
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    incoming = serial.readUntil(serial.delimiters(Delimiters.Hash)).trim()
// อัปเดตเวลาที่รับล่าสุด
    lastCommandTime = input.runningTime()
    switch (incoming) {
        case "U":
            iBIT.Motor(ibitMotor.Forward, speed)
            break
        case "D":
            iBIT.Motor(ibitMotor.Backward, speed)
            break
        case "L":
            // Spin Block
            iBIT.Spin(ibitSpin.Left, speed)
            break
        case "R":
            // Spin Block
            iBIT.Spin(ibitSpin.Right, speed)
            break
        case "C":
            iBIT.MotorStop()
            break
        case "S+":
            speed += 10
            if (speed > 100) speed = 100
            break
        case "S-":
            speed -= 10
            if (speed < 0) speed = 0
            break
        default:
    }
})
let lastCommandTime = 0
let incoming = ""
incoming = incoming.trim()
let speed = 50
lastCommandTime = input.runningTime()
iBIT.setADC_Address(adcAddress.iBIT_V2)
// กำหนดการรับผ่าน UART
serial.redirect(
SerialPin.P1,
SerialPin.P0,
BaudRate.BaudRate115200
)
// Loop เช็ค timeout เพื่อหยุดมอเตอร์
basic.forever(function () {
    if (input.runningTime() - lastCommandTime > 300) {
        iBIT.MotorStop()
    }
})
