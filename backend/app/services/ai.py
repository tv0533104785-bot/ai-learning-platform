import os
import httpx
from openai import OpenAI

def get_client():
    api_key=os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        raise Exception("OPENAI_API_KEY is missing")
    
    http_client=httpx.Client(
        verify=False,
        timeout=60.0
    )
    
    return  OpenAI(
        api_key=api_key,
        http_client=http_client
    )


def generate_lesson(prompt: str) -> str:

    client = get_client()
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a professional teacher. Explain topics as structured lessons."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content