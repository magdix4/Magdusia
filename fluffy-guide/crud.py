from sqlalchemy.orm import Session

from . import models, schemas


def get_authors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Author).offset(skip).limit(limit).all()


def create_author(db: Session, author: schemas.AuthorCreate):
    db_author = models.Author(**author.dict())
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author


def get_author_by_id(author_id: int, db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Author).filter(author_id == author_id).offset(skip).limit(limit).all()


def delete_author(db: Session, author_id: int):
    author = db.query(models.Author).filter(
        models.Author.id == author_id).first()
    db.delete(author)
    db.commit()
    return author


def update_author(db: Session, author_id: int, author: schemas.AuthorCreate):
    db_author = db.query(models.Author).filter(
        models.Author.id == author_id).first()
    db_author.name = author.name
    db_author.surname = author.surname
    db.commit()
    db.refresh(db_author)
    return author
