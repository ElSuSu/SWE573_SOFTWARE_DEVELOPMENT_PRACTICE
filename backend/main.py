
from fastapi import FastAPI

app = FastAPI(title="IndigenousCraft API")

@app.get("/")
def home():
    return {"message": "Welcome to IndigenousCraft API!"}

@app.get("/crafts")
def get_crafts():
    return [
        {"id": 1, "name": "Iznik Ceramics", "country": "Türkiye"},
        {"id": 2, "name": "Suzani Embroidery", "country": "Uzbekistan"},
        {"id": 3, "name": "Batik", "country": "Indonesia"}
    ]
