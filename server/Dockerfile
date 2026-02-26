FROM python:3.14-slim

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./src /app/src
COPY ./migrations /app/migrations
COPY ./alembic.ini /app/alembic.ini

# add entrypoint script which will apply migrations on startup
COPY ./entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

# Run the entrypoint via the shell so a bind-mounted script that
# doesn't have the executable bit can still be executed by the shell.
# This is useful in development when the host copy may not be +x.
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
