FROM python:3.8

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && python -m pip install pipenv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/blog/backend

COPY Pipfile /home/blog/backend
COPY Pipfile.lock /home/blog/backend/

RUN pipenv install --system --deploy 

COPY . .

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]