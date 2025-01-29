from flask import Blueprint, request, jsonify
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb
import os
from langchain_mistralai.chat_models import ChatMistralAI

loader = PyPDFLoader('E:/Hackathons/OdooXNirman/backend/app/i3325e.pdf')
Docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size = 1000,chunk_overlap = 0)
chunks = text_splitter.split_documents(Docs)

print(type(chunks))
print(type(chunks[0]))
text_chunk = [chunk.page_content for chunk in chunks]
print(type(text_chunk[0]))

res = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = res.encode(text_chunk)

#print(embeddings[600])
len(embeddings)

client = chromadb.PersistentClient(path='database')
collection  =client.get_or_create_collection('collection')

ids = [f"doc_{i}" for i in range(len(embeddings))]

# Define the maximum batch size
max_batch_size = 5000
'''
# Split the data into smaller batches
for i in range(0, len(embeddings), max_batch_size):
	batch_ids = ids[i:i + max_batch_size]
	batch_documents = text_chunk[i:i + max_batch_size]
	batch_embeddings = embeddings[i:i + max_batch_size]
	collection.add(ids=batch_ids, documents=batch_documents, embeddings=batch_embeddings)
    '''
'''from mistralai import Mistral
from langchain_mistralai.chat_models import ChatMistralAI
from langchain import VectorDBQA, PromptTemplate

geneartor = Mistral()

template = PromptTemplate(input_variables=["question"],
    template="Answer the following question: {Query}")
#qa_pipeline =  VectorDBQA(vector_store=collection, embeddings_model = res , prompt_template = template, language_model = geneartor)
response = qa_pipeline(Query)

print(response)'''


# Set your Mistral AI API key (Replace "your-api-key" with your actual key)
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

assistant_bp = Blueprint("assistant", __name__)

@assistant_bp.route("/chatbot", methods=["POST"])
def chatbot_route():
    data = request.json
    prompt = data.get("prompt")
    result = generate_response(prompt=prompt)
    return jsonify(result)