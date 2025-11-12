# train_itinerary_model.py
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Exemplo de dados fictícios: cada linha = preferências codificadas + num_dias + orçamento, etc.
data = {
    "pref_aventura": [1, 0, 1, 0, 1],
    "pref_natureza": [0, 1, 1, 0, 1],
    "num_days": [3, 5, 4, 2, 7],
    "budget": [500, 1000, 750, 300, 1500],
    "num_people": [2, 4, 3, 1, 5],
    "score": [0.8, 0.9, 0.85, 0.6, 0.95]  # Score “qualidade do roteiro”
}
df = pd.DataFrame(data)

X = df.drop("score", axis=1)
y = df["score"]

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# Salva o modelo
joblib.dump(model, "itinerary_model.joblib")
print("Modelo treinado e salvo.")
