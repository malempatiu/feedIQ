from fastapi import FastAPI
from server.src.feeds.router import feeds_router

app = FastAPI(title='feedIQ server')

@app.get('/')
async def read_root():
    return {
        'message': 'Hello from feedIQ server :)'
    }

app.include_router(router=feeds_router, prefix='/api/v1/feeds', tags=['feedbacks'])