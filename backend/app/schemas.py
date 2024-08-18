# Pydanticを使用してデータモデルを定義します。
# リクエストボディやレスポンスに使用されます。

from pydantic import BaseModel
from datetime import date

class TaskBase(BaseModel):
    name: str
    completed: bool
    date: date

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: str

    class Config:
        orm_mode = True