from pathlib import Path

from pypdf import PdfReader
from docx import Document


def load_document(file_path: str) -> str:
    """
    Load PDF, DOCX or TXT
    and return plain text.
    """

    suffix = Path(file_path).suffix.lower()

    # -------------------------
    # PDF
    # -------------------------
    if suffix == ".pdf":

        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text

    # -------------------------
    # DOCX
    # -------------------------
    elif suffix == ".docx":

        doc = Document(file_path)

        return "\n".join(
            p.text
            for p in doc.paragraphs
        )

    # -------------------------
    # TXT
    # -------------------------
    elif suffix == ".txt":

        with open(
            file_path,
            "r",
            encoding="utf-8",
        ) as f:

            return f.read()

    else:

        raise ValueError(
            "Unsupported file type."
        )