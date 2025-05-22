from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import List
import requests

app = FastAPI()

# Replace with your actual API key
USDA_API_KEY = "YOUR_USDA_API_KEY"

class FoodItem(BaseModel):
    name: str
    quantity: int = 1

class FoodEntry(BaseModel):
    user_id: int
    items: List[FoodItem]
    timestamp: datetime

@app.post("/log_food")
async def log_food(entry: FoodEntry):
    nutrition_data = []
    for item in entry.items:
        response = requests.get(
            f"https://api.nal.usda.gov/fdc/v1/foods/search",
            params={"query": item.name, "api_key": USDA_API_KEY}
        )
        result = response.json()
        if result.get("foods"):
            food_info = result["foods"][0]
            nutrition_data.append({
                "name": item.name,
                "quantity": item.quantity,
                "calories": food_info.get("foodNutrients", [{}])[0].get("value", 0)
            })
    return {"status": "logged", "nutrition": nutrition_data}