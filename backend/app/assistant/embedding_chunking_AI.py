from flask import Blueprint, request, jsonify
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb
import pandas as pd
import os
import glob

# Define file paths
pdf_files = glob.glob("D:/Programs/Nirman_2025/V3/backend/app/DataSets/*.pdf")
csv_files = glob.glob("D:/Programs/Nirman_2025/V3/backend/app/DataSets/*.csv")

# Load PDFs
loaders = [PyPDFLoader(pdf) for pdf in pdf_files]
Docs = [loader.load() for loader in loaders]

# Flatten PDF pages
all_pages = [page for doc in Docs for page in doc]

# Load CSVs and extract text
csv_texts = []
for csv_file in csv_files:
    df = pd.read_csv(csv_file)
    if "text" in df.columns:  # Ensure the file has a "text" column
        csv_texts.extend(df["text"].dropna().tolist())  # Add text content

# Convert CSV texts into document format (like PDFs)
csv_docs = [{"page_content": text} for text in csv_texts]

# Combine CSV and PDF documents
all_documents = all_pages + csv_docs

# Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=0)
chunks = text_splitter.split_documents(all_documents)

# Extract text content for embeddings
# Extract text content correctly
text_chunk = [chunk.page_content for chunk in chunks]  # Use .page_content instead of ["page_content"]

#text_chunk = [chunk["page_content"] for chunk in chunks]
print(type(chunks))
print(type(chunks[0]))
print(type(text_chunk[0]))

# Generate embeddings
res = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = res.encode(text_chunk)

# Store embeddings in ChromaDB
client = chromadb.PersistentClient(path='database')
collection = client.get_or_create_collection('collection')

ids = [f"doc_{i}" for i in range(len(embeddings))]
