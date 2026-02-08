FROM python:3.14-slim

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./src /code/src
COPY ./migrations /code/migrations
COPY ./alembic.ini /code/alembic.ini

EXPOSE 8000

CMD ["fastapi", "run", "src/main.py", "--port", "8000", "--reload"]