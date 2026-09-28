const fs = require("fs");
const path = require("path");

const queueFile = path.join(__dirname, "queue.json");

// ==========================================
// INITIALIZE QUEUE
// ==========================================

function initializeQueue() {
  if (!fs.existsSync(queueFile)) {
    fs.writeFileSync(queueFile, JSON.stringify([], null, 2));
  }
}

// ==========================================
// SEND SENSOR MESSAGE
// ==========================================

function sendSensorMessage(sensorType, value, unit) {
  initializeQueue();

  const queue = JSON.parse(fs.readFileSync(queueFile, "utf8"));

  const message = {
    id: Date.now(),
    sensorType: sensorType,
    value: value,
    unit: unit,
    timestamp: new Date().toISOString(),
  };

  queue.push(message);

  fs.writeFileSync(queueFile, JSON.stringify(queue, null, 2));

  console.log(`Sensor event submitted: ${JSON.stringify(message)}`);
}

// ==========================================
// SAMPLE SENSOR EVENTS
// ==========================================

sendSensorMessage("pH", 7.1, "pH");
sendSensorMessage("Dissolved Oxygen", 6.4, "mg/L");
sendSensorMessage("Water Temperature", 27.2, "°C");
