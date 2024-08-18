# SQLAlchemyでテーブルを定義します。
# SQLiteはSQLAlchemyと簡単に統合できます。
from sqlalchemy import create_engine, Column, String, Boolean, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"  # SQLiteのデータベースファイル名

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Task(Base):
    __tablename__ = "tasks"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    completed = Column(Boolean, default=False)
    date = Column(Date)

Base.metadata.create_all(bind=engine)
