from fastapi import FastAPI
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os

app = FastAPI()
load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

@app.get("/llm/{prompt}")
async def read_root(prompt: str):
    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)],
        ),
    ]

    tools = [
        types.Tool(googleSearch=types.GoogleSearch()),
    ]

    generate_content_config = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=-1),
        tools=tools,
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config=generate_content_config,
    )

    print(response.text)
    return {"respuesta": response.text}