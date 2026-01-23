from fastapi import APIRouter, Depends
from src.db.session import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.models import Hero
from sqlmodel import select

feeds_router = APIRouter()

@feeds_router.post('/')
async def get_feeds(session: AsyncSession = Depends(get_async_session)):
    hero = Hero(name="Deadpond", secret_name="Dive Wilson")
    session.add(hero)
    await session.commit()
    return {
        'message': 'success'
    }


@feeds_router.get('/')
async def get_feed(session: AsyncSession = Depends(get_async_session)):
    statement = select(Hero).where(Hero.id == 1)
    result = await session.execute(statement=statement)
    hero = result.first()
    data = hero[0] if hero is not None else None
    print(data)
    return {'hero': data}
