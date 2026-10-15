from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio, random, json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Cyber Threat Detection Engine Running"}

@app.websocket("/ws/logs")
async def websocket_logs(websocket: WebSocket):
    await websocket.accept()
    while True:
        # Simulate normal or attack traffic
        is_attack = random.random() < 0.30
        
        failed_logins = random.randint(12, 35) if is_attack else random.randint(0, 2)
        req_rate = random.randint(180, 400) if is_attack else random.randint(5, 25)
        unknown_user = 1 if is_attack else 0
        ip = f"185.220.{random.randint(1,255)}.{random.randint(1,255)}" if is_attack else f"192.168.1.{random.randint(2,50)}"
        
        # Anomaly Detection Logic (Statistical Threshold Scoring)
        is_anomaly = True if (failed_logins > 5 or req_rate > 100 or unknown_user == 1) else False
        
        # Risk Score Calculation (0 - 100%)
        if is_anomaly:
            risk_score = min(100, int((failed_logins * 2.5) + (req_rate / 4) + (unknown_user * 20)))
        else:
            risk_score = random.randint(4, 15)

        log_data = {
            "ip": ip,
            "failed_logins": failed_logins,
            "request_rate": req_rate,
            "is_anomaly": is_anomaly,
            "attack_type": random.choice(["SSH Brute Force", "DDoS Spike", "Unauthorized Admin Access"]) if is_anomaly else "Normal Activity",
            "risk_score": risk_score,
            "recommendation": "Block IP immediately" if risk_score > 60 else "No Action Needed"
        }

        await websocket.send_text(json.dumps(log_data))
        await asyncio.sleep(2)