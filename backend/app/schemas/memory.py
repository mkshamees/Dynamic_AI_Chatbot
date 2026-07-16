from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MemoryCreate(BaseModel):
    key: str
    value: str


class MemoryResponse(BaseModel):
    id: int
    key: str
    value: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)