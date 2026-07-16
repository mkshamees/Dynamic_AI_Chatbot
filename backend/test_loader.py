from app.rag.loader import load_document
from app.rag.splitter import split_text

text = load_document(
    r"C:\Users\G-USER\Documents\Rplot.pdf"
)

chunks = split_text(text)

print(f"Total chunks: {len(chunks)}")

print("\nFirst Chunk\n")
print(chunks[0])