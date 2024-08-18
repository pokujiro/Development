# データベースに対するCRUD操作を行う関数を定義します。
from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date

def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()

def get_task_by_date(db: Session, task_date: date):
    return db.query(models.Task).filter(models.Task.date == task_date).all()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(id=task.id, name=task.name, completed=task.completed, date=task.date)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: str):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    db.delete(db_task)
    db.commit()
    return db_task

def update_task(db: Session, task_id: str, completed: bool):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if db_task:
        db_task.completed = completed
        db.commit()
        db.refresh(db_task)
    return db_task