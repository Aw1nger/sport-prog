FROM python:alpine
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "./TrackingSite/manage.py", "runserver", "0.0.0.0:8000"]