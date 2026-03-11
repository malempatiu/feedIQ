from fastapi import FastAPI
from src.feeds.router import feeds_router
from src.auth.router import user_router
from fastapi.middleware.cors import CORSMiddleware
from inngest import fast_api
from src.background_tasks.client import inngest_client
from src.background_tasks.tasks.categorize_feedback_bg import categorize_feedback_background
import logging
from contextlib import asynccontextmanager
from src.message_broker.producer import producer

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

origins = [
    "http://localhost:5173",
]

version = 'v1'


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Kafka producer…")
    await producer.start()

    yield

    logger.info("Stopping Kafka producer…")
    await producer.stop()

app = FastAPI(
    title='feedIQ server',
    description='A REST API for feedIQ (A product feedback app)',
    version=version,
    docs_url=f"/api/{version}/docs",
    redoc_url=f"/api/{version}/redoc",
    lifespan=lifespan
)

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

app.include_router(router=feeds_router,
                   prefix=f"/api/{version}/feeds", tags=['feedbacks'])
app.include_router(router=user_router,
                   prefix=f"/api/{version}/auth", tags=['authentication'])
fast_api.serve(app, inngest_client, [categorize_feedback_background])

# Hide Inngest API from Swagger documentation
original_openapi = app.openapi


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = original_openapi()

    # Filter out Inngest routes from paths
    if openapi_schema and "paths" in openapi_schema:
        inngest_paths = [
            path for path in openapi_schema["paths"] if "/api/inngest" in path]
        for path in inngest_paths:
            del openapi_schema["paths"][path]

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
