const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// SENSOR DATA MODULE
// ==========================================

let sensorData = [
  {
    id: 1,
    ph: 7.1,
    waterTemperature: 26.5,
    dissolvedOxygen: 6.2,
    turbidity: 2.1,
    waterLevel: 85,
    timestamp: "2026-09-28T10:00:00",
  },
  {
    id: 2,
    ph: 6.9,
    waterTemperature: 27.1,
    dissolvedOxygen: 6.0,
    turbidity: 2.5,
    waterLevel: 82,
    timestamp: "2026-09-28T11:00:00",
  },
];

// GET /sensor-data
app.get("/sensor-data", (req, res) => {
  res.status(200).json(sensorData);
});

// POST /sensor-data
app.post("/sensor-data", (req, res) => {
  const { ph, waterTemperature, dissolvedOxygen, turbidity, waterLevel } =
    req.body;

  if (
    ph === undefined ||
    waterTemperature === undefined ||
    dissolvedOxygen === undefined ||
    turbidity === undefined ||
    waterLevel === undefined
  ) {
    return res.status(400).json({
      message:
        "ph, waterTemperature, dissolvedOxygen, turbidity, and waterLevel are required.",
    });
  }

  const newSensorData = {
    id: sensorData.length + 1,
    ph,
    waterTemperature,
    dissolvedOxygen,
    turbidity,
    waterLevel,
    timestamp: new Date().toISOString(),
  };

  sensorData.push(newSensorData);

  res.status(201).json(newSensorData);
});

// ==========================================
// ACTUATOR CONTROL MODULE
// ==========================================

let actuatorControls = [
  {
    id: 1,
    device: "Water Pump",
    status: "ON",
    mode: "AUTO",
  },
  {
    id: 2,
    device: "Aerator",
    status: "ON",
    mode: "AUTO",
  },
  {
    id: 3,
    device: "Fish Feeder",
    status: "OFF",
    mode: "MANUAL",
  },
  {
    id: 4,
    device: "Grow Light",
    status: "OFF",
    mode: "AUTO",
  },
];

// GET /actuator-controls
app.get("/actuator-controls", (req, res) => {
  res.status(200).json(actuatorControls);
});

// POST /actuator-controls
app.post("/actuator-controls", (req, res) => {
  const { device, status, mode } = req.body;

  if (!device || !status || !mode) {
    return res.status(400).json({
      message: "device, status, and mode are required.",
    });
  }

  const newActuatorControl = {
    id: actuatorControls.length + 1,
    device,
    status,
    mode,
  };

  actuatorControls.push(newActuatorControl);

  res.status(201).json(newActuatorControl);
});

// ==========================================
// DEFAULT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "AQUANICS REST API is running.",
    system: "IoT-Based Aquaponics Monitoring System",
    endpoints: {
      sensorData: "/sensor-data",
      actuatorControls: "/actuator-controls",
    },
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`AQUANICS REST API running at http://localhost:${PORT}`);
});
