FROM python:3

WORKDIR /usr/src/app

COPY * /usr/src/app/

COPY lib /usr/src/app/lib

RUN pip install --upgrade -r ./requirements.txt

CMD ["python", "app.py"]
