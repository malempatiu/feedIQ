FROM python:3.14-slim

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./src /app/src
COPY ./migrations /app/migrations
COPY ./alembic.ini /app/alembic.ini

EXPOSE 8000

CMD ["fastapi", "run", "src/main.py", "--port", "8000", "--reload"]