from django.db import models

# Create your models here.
import random

class SimpleItineraryModel:
    """
    Modelo de Machine Learning simulado.
    Em produção, pode ser trocado por um modelo real treinado com scikit-learn, transformers, etc.
    """

    def __init__(self):
        self.activities = {
            "aventura": ["Escalada", "Rafting", "Trilha em montanha", "Passeio de jipe"],
            "natureza": ["Visita a parques", "Cachoeiras", "Observação de aves", "Trilhas leves"],
            "cultural": ["Museus", "Teatros", "Monumentos históricos", "Feiras locais"],
            "gastronomia": ["Degustação local", "Restaurantes típicos", "Aulas de culinária"]
        }

    def generate(self, activity_type, num_people, num_days, adults, children, budget):
        base = self.activities.get(activity_type.lower(), ["Atividade local"])
        itinerary = []

        for day in range(1, num_days + 1):
            activity = random.choice(base)
            itinerary.append(f"Dia {day}: {activity}")

        return {
            "summary": f"Roteiro de {num_days} dias focado em {activity_type}.",
            "details": itinerary,
            "estimated_budget": f"~ {budget} USD",
            "group_info": f"{adults} adultos e {children} crianças ({num_people} pessoas no total)"
        }


# Instância global (carrega uma vez)
itinerary_model = SimpleItineraryModel()

