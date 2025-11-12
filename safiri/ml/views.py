from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

# Carregar variáveis de ambiente
load_dotenv()
api_key = os.getenv("HUGGINGFACE_API_KEY")

if not api_key:
    raise ValueError("HUGGINGFACE_API_KEY environment variable is required")

# Inicializar cliente Hugging Face
client = InferenceClient(api_key=api_key)


class GenerateItineraryView(APIView):
    """
    Endpoint /api/ml/generate_itinerary/
    Recebe os dados do utilizador e gera um roteiro personalizado.
    """

    def post(self, request):
        nome = request.data.get("nome", "Viajante")
        idades = request.data.get("idades", "")
        cidade = request.data.get("cidade", "")
        dias = request.data.get("dias", 3)
        horas_diarias = request.data.get("horas_diarias", 5)
        orcamento = request.data.get("orcamento", 50000)
        tamanho_grupo = request.data.get("tamanho_grupo", 2)
        atividades = request.data.get("atividades", "")

        if not cidade:
            return Response({"error": "Campo 'cidade' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        user_prompt = f"""
Nome: {nome}
Idades do grupo: {idades}
Local de destino: {cidade}
Número de dias: {dias}
Horas diárias de atividades: {horas_diarias}
Tamanho do grupo: {tamanho_grupo} pessoa(s)
Orçamento total: {orcamento} Kz
Atividades preferidas: {atividades}

Crie um roteiro detalhado e personalizado para {dias} dias em {cidade}.
Organize por dias, inclua custos estimados, horários e dicas culturais.
Use emojis para tornar o roteiro mais visual e atrativo.
"""

        conversation = [
            {
                "role": "system",
                "content": "Você é um especialista em turismo angolano e assistente de viagens autêntico e sustentável.",
            },
            {"role": "user", "content": user_prompt},
        ]

        try:
            response = client.chat.completions.create(
                model="meta-llama/Llama-3.3-70B-Instruct",
                messages=conversation,
                max_tokens=1200,
            )
            itinerary_text = response.choices[0].message["content"]

            return Response({"itinerary": itinerary_text}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"Erro ao gerar roteiro: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Endpoint para classificar texto
class ClassifyTextView(APIView):
    def post(self, request):
        text = request.data.get("text", "")
        if not text:
            return Response({"error": "Texto é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        # Exemplo simples — substitui por IA real depois
        classification = "spam" if "http" in text.lower() else "normal"
        confidence = random.uniform(0.75, 0.99)

        return Response({
            "text": text,
            "classification": classification,
            "confidence": round(confidence, 2)
        })


# Endpoint para recomendar posts (simulado)
class RecommendPostsView(APIView):
    def get(self, request, user_id):
        posts = list(Post.objects.all())
        random.shuffle(posts)
        serializer = PostSerializer(posts[:5], many=True)
        return Response(serializer.data)