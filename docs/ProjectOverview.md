# Project Overview

## 1. System Objectives

- Develop an IoT-based aquaponics monitoring system that monitors water and environmental parameters in real time and displays data through a dashboard.
- Implement predictive analytics to detect potential issues such as water imbalance and plant stress.
- Evaluate the system's accuracy, reliability, and overall performance in monitoring and prediction.
- Assess the system's effectiveness in reducing manual labor and optimizing resource usage.
- Determine the system's impact in improving digital skills and promoting sustainability awareness.

## 2. Proposed Scope

### Modules/Systems to Integrate

- User Authentication System
- Sensor Monitoring System
- Dashboard and Data Visualization System
- Notification and Alert System
- Device Control and Automation System
- Predictive Analytics System
- Cloud Database Integration
- Reporting System

### In-Scope Features for Lab 1–3

- User login and authentication
- Real-time monitoring of water quality parameters
- Dashboard visualization
- Data logging and storage
- Notifications and alerts
- Remote device control
- Automation of feeding, aeration, and lighting
- Predictive analytics and recommendations

### Out-of-Scope (For Now)

- Features not included in the current prototype implementation
- Expansion to other agricultural systems outside aquaponics
- Additional integrations beyond those specified in the project proposal

## 3. Stakeholders

- Farmers and Aquaponics Operators — Monitor environmental conditions and improve productivity.
- Students and Researchers — Learn and conduct research using real-time monitoring data.
- Teachers and School Administrators — Use the system as an educational and sustainability platform.
- Local Government Units (LGUs) — Support smart agriculture and sustainability initiatives.

## 4. Tools & Technologies

### Languages/Frameworks

- HTML
- CSS
- JavaScript
- Python

### Integration Approach

- IoT Device Communication
- Cloud Database Integration
- Real-Time Data Synchronization

### Repos/Services

- GitHub
- Microsoft Teams

### Testing Tools

- Functional Testing
- Integration Testing
- User Acceptance Testing (UAT)
- Hardware Validation Testing

## High-Level System Overview

### 1. Major Modules / Subsystems

AQUANICS is composed of several interconnected modules that work together to support real-time aquaponics monitoring, automated control, cloud data management, and predictive analytics.

- **Sensor and Control Module** - Collects real-time environmental and water-quality data such as **pH, temperature, dissolved oxygen (DO), turbidity, humidity, and water level** using ESP32 microcontrollers and connected sensors. The module also controls actuators such as **water pumps, fish feeders, and grow lights** based on system conditions and user-defined commands. |

- **Cloud Server and Database Module** - Uses **Firebase Cloud** for real-time data storage, synchronization, and management. It stores current sensor readings and historical records that can be used for monitoring, trend analysis, predictive analytics, and remote system management. |

- **Web Dashboard and Analytics Module** - Provides the main user interface for monitoring and managing the aquaponics system. It displays real-time sensor readings, historical trends, alerts, and analytics. The module also supports predictive analysis and allows authorized users to remotely control connected actuators.

- **Alert and Notification Module** - Monitors sensor readings and identifies conditions that may require attention. It provides alerts when monitored parameters reach predefined caution or critical conditions, helping users respond to potential aquaponics system issues.

- **Predictive Analytics Module** Processes historical and real-time aquaponics data to identify patterns and generate predictive insights. These insights can support early detection of possible environmental changes and assist users in making informed management decisions. |

---

### 2. External Systems / Interfaces

AQUANICS integrates with several external systems, services, and interfaces to support communication between the hardware, cloud infrastructure, and user-facing application.

- **Firebase Cloud API** – Provides cloud-based data storage, real-time synchronization, and access to historical sensor records used by the monitoring and analytics components.

- **ESP32 SDK and Sensor Libraries** – Support communication between the ESP32 microcontrollers and connected sensors and actuators. These components enable the system to collect sensor readings and issue control commands to connected devices.

- **Web Application Interface** – Provides communication between the user-facing dashboard and cloud services. It retrieves sensor data, displays monitoring information, presents analytics, and sends authorized control commands.

- **IoT Sensor and Actuator Interfaces** – Connect the ESP32 microcontrollers with water-quality and environmental sensors, as well as actuators such as pumps, feeders, and grow lights.

- **Predictive Analytics Interface** – Connects collected and stored aquaponics data with the analytics component to generate trends, predictions, and system insights.

---

### 3. Data Flow Summary

The AQUANICS system follows a continuous data flow between the **sensors, ESP32 microcontrollers, Firebase Cloud, web dashboard, analytics components, and actuators**.

First, the connected sensors collect real-time aquaponics data such as **pH, temperature, dissolved oxygen, turbidity, humidity, and water level**. The ESP32 microcontrollers process the sensor readings and transmit the collected data through **Wi-Fi** to the Firebase Cloud.

Firebase stores and synchronizes the incoming data, allowing both real-time monitoring and historical data storage. The **Web Dashboard** retrieves the stored information and presents it to authorized users through real-time readings, visualizations, trends, alerts, and predictive analytics.

Based on system conditions, analytics results, or authorized user input, control commands can be transmitted through the cloud back to the ESP32 control module. The ESP32 then operates the appropriate actuators, such as **water pumps, fish feeders, and grow lights**.

This creates a continuous monitoring and control cycle:

**Sensors → ESP32 → Wi-Fi → Firebase Cloud → Web Dashboard & Analytics → Control Commands → ESP32 → Actuators**

The system also incorporates **solar energy** to support continuous operation and improve system availability during regional power instabilities.

## Integration Pattern Applied

### Hub-and-Spoke Architecture

### Rationale

The Hub-and-Spoke pattern is appropriate for AQUANICS because the system involves multiple interconnected components, including ESP32-based sensors and actuators, Firebase Cloud, the web dashboard, predictive analytics, and alert services. The sensors and devices continuously collect aquaponics data and transmit the readings through the central hub. The hub routes the data to Firebase Cloud for real-time storage and historical records. The stored information can then be accessed by the predictive analytics module for trend analysis and system insights.

When a user performs an action through the web dashboard, the request is routed through the central hub and forwarded to the appropriate device or service. Similarly, when sensor readings reach caution or critical conditions, the hub can route the information to the alert and notification module for user notification. Using a centralized integration approach reduces complex point-to-point dependencies between components, making the system easier to maintain, troubleshoot, and expand as additional sensors, actuators, or services are introduced.

### Diagram Reference

The high-level architecture diagram for AQUANICS is available below:

docs/HighLevelArch.png

# AQUANICS Messaging Middleware

## Overview

The AQUANICS messaging middleware demonstrates asynchronous communication between the Sensor Data Module and the Alert/Monitoring Module.

The Sensor Data Module acts as the producer by submitting sensor events to a message queue.
The Alert/Monitoring Module acts as the consumer by retrieving and processing queued sensor events.

## Technologies

- Node.js
- JavaScript
- File-based message queue

## Producer

Run:

```bash
node producer.js
```
