from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date

app = FastAPI()

origins = [
    "http://localhost:3000",  
    # フロントエンドのURL（Reactの開発サーバー）
    "http://localhost:8000",  
    # バックエンド自身（APIテストのため）
]

app.add_middleware(
    CORSMiddleware,
    # CORSを許可するオリジンを設定 credential:信頼
    allow_origins=origins,
    allow_credentials=True,
    # 許可するHTTPメソッド
    allow_methods=["*"],
    # 許可するHTTPヘッダー
    allow_headers=["*"],
)


tasks = []


class Task(BaseModel):
    id: str
    name: str
    completed: bool
    date: date

@app.get("/")
def read_root():
    return {"Hello": "World"}

# GET /api/tasks
@app.get("/api/tasks")
async def read_tasks():
    return tasks

# 日付でタスクをフィルタリングするエンドポイント
@app.get("/api/tasks/{task_date}")
async def read_tasks_by_date(task_date: date):
    return [task for task in tasks if task['date'] == task_date.isoformat()]

# POST /api/tasks タスクを追加するエンドポイント
@app.post("/api/tasks")
async def create_task(task: Task):
    task_dict = task.dict()
    task_dict['date'] = task_dict['date'].isoformat() # 日付をISO形式の文字列に変換
    tasks.append(task_dict)
    return task_dict

# タスクを削除するエンドポイント
@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return {"message: Task deleted"}

# タスクの更新
@app.put("/api/tasks/{task_id}")
async def update_task(task_id: str, task:dict):
    global tasks
    for t in tasks:
        if t["id"] == task_id:
            t["completed"] = task["completed"]
            return t
    return {"error": "Task not found"}, 404
'''
pet = {
    "name": "dog",
    "level": 1,
    "affection": 0
}

@app.get("/api/pet")
async def get_pet():
    return pet

@app.post("/api/pet/affection")
async def update_pet_affection(points: int):
    global pet
    new_affection = pet["affection"] + points
    if new_affection >= 100:
        pet = {
            "name": pet["name"],
            "level": pet["level"] + 1,
            "affection": new_affection % 100
        }
    else:
        pet["affection"] = new_affection
    return pet
'''
    
# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from . import models, schemas, crud, database
# from typing import List
# from datetime import date
# from fastapi.middleware.cors import CORSMiddleware

# models.Base.metadata.create_all(bind=database.engine)

# app = FastAPI()

# origins = [
#     "http://localhost:3000",  
#     # フロントエンドのURL（Reactの開発サーバー）
#     "http://localhost:8000",  
#     # バックエンド自身（APIテストのため）
# ]

# app.add_middleware(
#     CORSMiddleware,
#     # CORSを許可するオリジンを設定 credential:信頼
#     allow_origins=origins,
#     allow_credentials=True,
#     # 許可するHTTPメソッド
#     allow_methods=["*"],
#     # 許可するHTTPヘッダー
#     allow_headers=["*"],
# )

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

# @app.get("/api/tasks", response_model=List[schemas.Task])
# def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
#     tasks = crud.get_tasks(db, skip=skip, limit=limit)
#     return tasks

# @app.get("/api/tasks/{task_date}", response_model=List[schemas.Task])
# def read_tasks_by_date(task_date: date, db: Session = Depends(database.get_db)):
#     tasks = crud.get_task_by_date(db, task_date=task_date)
#     return tasks

# @app.post("/api/tasks", response_model=schemas.Task)
# def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
#     return crud.create_task(db=db, task=task)

# @app.delete("/api/tasks/{task_id}")
# def delete_task(task_id: str, db: Session = Depends(database.get_db)):
#     return crud.delete_task(db=db, task_id=task_id)

# @app.put("/api/tasks/{task_id}")
# def update_task(task_id: str, completed: bool, db: Session = Depends(database.get_db)):
#     return crud.update_task(db=db, task_id=task_id, completed=completed)
