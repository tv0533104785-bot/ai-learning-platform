def process_prompt(text:str):
    processed_text=text.strip().lower
    return{
        "original":text,
        "processed":processed_text,
        "status":"ok"
    }