from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from typing import List, Union

app = FastAPI()

class DataRequest(BaseModel):
    data: List[Union[str, int]]

class DataResponse(BaseModel):
    is_success: bool
    user_id: str
    email: str
    roll_number: str
    numbers: List[str]
    alphabets: List[str]
    highest_lowercase_alphabet: List[str]

USER_ID = "ansh_nenwani_270703"
EMAIL = "nenwaniansh@gmail.com"
ROLL_NUMBER = "21BCE2089"

@app.post("/bfhl", response_model=DataResponse)
async def process_data(request: DataRequest):
    data = request.data
    numbers = [str(item) for item in data if str(item).isdigit()]
    alphabets = [str(item) for item in data if str(item).isalpha()]

    highest_lowercase_alphabet = [max([ch for ch in alphabets if ch.islower()], default="")]

    response = {
        "is_success": True,
        "user_id": USER_ID,
        "email": EMAIL,
        "roll_number": ROLL_NUMBER,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase_alphabet if highest_lowercase_alphabet[0] else []
    }

    return response

@app.get("/bfhl")
async def get_operation_code():
    return {"operation_code": 1}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
