const fs = require("fs");
const path = require("path");

const queueFile = path.join(__dirname, "queue.json");

// ==========================================
// SENSOR THRESHOLD PROCESSING
// ==========================================

function evaluateSensor(sensorType, value) {
  if (sensorType === "pH") {
    if (value < 6.0 || value > 8.0) {
      return "CRITICAL";
    }

    if (value < 6.5 || value > 7.5) {
      return "WARNING";
    }

    return "NORMAL";
  }

  if (sensorType === "Dissolved Oxygen") {
    if (value < 4.0) {
      return "CRITICAL";
    }

    if (value < 5.0) {
      return "WARNING";
    }

    return "NORMAL";
  }

  if (sensorType === "Water Temperature") {
    if (value < 20 || value > 32) {
      return "CRITICAL";
    }

    if (value < 22 || value > 30) {
      return "WARNING";
    }

    return "NORMAL";
  }

  return "UNKNOWN";
}

// ==========================================
// PROCESS QUEUED MESSAGES
// ==========================================

function processMessages() {
  if (!fs.existsSync(queueFile)) {
    console.log("Message queue is empty.");

    return;
  }

  const queue = JSON.parse(fs.readFileSync(queueFile, "utf8"));

  if (queue.length === 0) {
    console.log("No messages available in the queue.");

    return;
  }

  console.log("\n==========================================");
  console.log("AQUANICS MESSAGE CONSUMER");
  console.log("==========================================\n");

  while (queue.length > 0) {
    const message = queue.shift();

    const result = evaluateSensor(message.sensorType, message.value);

    console.log(`Sensor event for ${message.sensorType} → ${result}`);

    console.log(`Value: ${message.value} ${message.unit}`);

    console.log(`Timestamp: ${message.timestamp}`);

    console.log("------------------------------------------");
  }

  fs.writeFileSync(queueFile, JSON.stringify(queue, null, 2));

  console.log("\nAll queued messages have been processed.");
}

// ==========================================
// START CONSUMER
// ==========================================

processMessages();
