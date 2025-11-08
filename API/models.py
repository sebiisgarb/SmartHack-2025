from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from database import Base

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))

class Sentence(Base):
    __tablename__ = "sentences"
    id = Column(Integer, primary_key=True)
    text = Column(Text)
    level = Column(String(10))
    # audio_url = Column(Text)

# class Task(Base):
#     _tablename_ = "tasks"
#     id = Column(Integer, primary_key=True)
#     title = Column(String(200))
#     created_at = Column(TIMESTAMP, server_default=func.now())
#
# class TaskSentence(Base):
#     _tablename_ = "task_sentences"
#     id = Column(Integer, primary_key=True)
#     task_id = Column(Integer, ForeignKey("tasks.id"))
#     sentence_id = Column(Integer, ForeignKey("sentences.id"))
#     position = Column(Integer)
#
# class ResultSentence(Base):
#     _tablename_ = "results_sentence"
#     id = Column(Integer, primary_key=True)
#     student_id = Column(Integer, ForeignKey("students.id"))
#     task_id = Column(Integer, ForeignKey("tasks.id"))
#     sentence_id = Column(Integer, ForeignKey("sentences.id"))
#
#     audio_url = Column(Text)
#     stt_text = Column(Text)
#     correct_text = Column(Text)
#     score = Column(Integer)
#     feedback_elev = Column(Text)
#     feedback_prof = Column(Text)
#
#     created_at = Column(TIMESTAMP, server_default=func.now())
#
# class ResultTask(Base):
#     _tablename_ = "results_task"
#     id = Column(Integer, primary_key=True)
#     student_id = Column(Integer, ForeignKey("students.id"))
#     task_id = Column(Integer, ForeignKey("tasks.id"))
#
#     score_avg = Column(Integer)
#     completed_count = Column(Integer)
#     total_sentences = Column(Integer)
#     is_completed = Column(Boolean)
#
#     feedback_elev = Column(Text)
#     feedback_prof = Column(Text)
#
#     created_at = Column(TIMESTAMP, server_default=func.now())