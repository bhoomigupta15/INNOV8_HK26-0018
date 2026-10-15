# 🛡️ AI Cyber Threat Detection SOC Dashboard

An AI-assisted cyber defense platform that monitors real-time system logs, flags anomalies, scores threat risks, and recommends security actions to eliminate Security Operations Center (SOC) alert fatigue.

## 🚀 Features
- **Real-Time Log Stream:** Live WebSocket analytics streaming system activity every 2 seconds.
- **Anomaly Detection:** Instant detection of unauthorized logins, SSH brute force attacks, and DDoS spikes.
- **Dynamic Risk Gauge:** Real-time risk scoring engine (0–100%).
- **Actionable Escalation:** Automatic security recommendations for high-risk threats.

## 🛠️ Tech Stack
- **Backend:** Python, FastAPI, WebSockets
- **Frontend:** React.js, Tailwind CSS

## 🏁 How to Run Locally

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
pip install fastapi uvicorn
python -m uvicorn main:app --reload --port 8000
