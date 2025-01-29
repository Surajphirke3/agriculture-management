import os
from langchain_mistralai.chat_models import ChatMistralAI
import chromadb
from flask import Blueprint, request, jsonify       

# Set your Mistral AI API key (Replace "your-api-key" with your actual key)
os.environ["MISTRAL_API_KEY"] = "236mWUjffs24Rg2pkQNfQiJNxg9EUxNO"

# Initialize ChromaDB client and collection
client = chromadb.PersistentClient(path='database')
collection = client.get_or_create_collection('collection')

os.environ["MISTRAL_API_KEY"] = "236mWUjffs24Rg2pkQNfQiJNxg9EUxNO"

def generate_response(prompt: str, model_name: str = "mistral-small", temperature: float = 0.7) -> str:
    """
    Generate a response using the Mistral AI model.

    Args:
        prompt (str): The input question or prompt.
        model_name (str): The Mistral model to use (default: "mistral-small").
        temperature (float): The temperature setting for creativity (default: 0.7).

    Returns:
        str: The generated response from Mistral AI.
    """
    try:
        # Initialize Mistral AI model with API key
        generator = ChatMistralAI(
            model=model_name,  # Model name (e.g., "mistral-small")
            temperature=temperature,
            mistral_api_key=os.getenv("MISTRAL_API_KEY")  # Fetch API key from env variable
        )

        # Generate and return the response
        response = generator.predict(prompt)
        return response
    except Exception as e:
        return f"Error: {e}"
'''
prompt = "which crops to grow in low moisture and harsh winter season?"

# Call the function
response = generate_response(prompt=prompt)

# Display the response
print("Generated Response:", response)
'''