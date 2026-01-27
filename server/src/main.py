from fastapi import FastAPI
from .feeds.router import feeds_router
from .auth.router import user_router
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
]

app = FastAPI(title='feedIQ server')
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def read_root():
    return {
        'message': 'Hello from feedIQ server :)'
    }

app.include_router(router=feeds_router, prefix='/api/v1/feeds', tags=['feedbacks'])
app.include_router(router=user_router, prefix='/api/v1/auth', tags=['authentication'])
