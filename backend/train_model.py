import numpy as np
from sklearn.ensemble import IsolationForest
import pickle

np.random.seed(42)
normal_logs = np.random.normal(loc=[1, 10, 0], scale=[0.5, 2, 0.1], size=(1000, 3))
attack_logs = np.random.normal(loc=[15, 200, 1], scale=[3, 50, 0.2], size=(50, 3))

X = np.clip(np.vstack([normal_logs, attack_logs]), 0, None)
model = IsolationForest(contamination=0.05, random_state=42).fit(X)

with open("threat_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model Trained!")