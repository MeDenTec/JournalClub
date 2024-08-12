import os
from flask import Flask, request, jsonify, render_template
import requests
from flask_cors import CORS
from dotenv import load_dotenv
# import azure.cognitiveservices.speech as speechsdk

load_dotenv()

app = Flask(__name__)
CORS(app)

# Get your API key from environment variables
api_key = os.getenv("AZURE_OPENAI_API_KEY")
endpoint = os.getenv("ENDPOINT_URL")
deployment = "gpt40"
search_endpoint = os.getenv("SEARCH_ENDPOINT") # ADD SEARCH_EDNPOINT IN DOTENV
search_key = os.getenv("SEARCH_KEY") # AZURE_AI_SEARCH_KEY
search_index = os.getenv("SEARCH_INDEX_NAME") # BLOB INDEX NAME

print(endpoint, deployment, search_endpoint, search_key, search_index)

@app.route('/')
def index():
    global message_list
    message_list = []
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat_completion():
    data = request.json
    user_message = data.get("message")
    print(user_message)
    user_obj = {
        "role": "user",
        "content": user_message
    }
    # global message_list
    print(message_list)
    message_list.append(user_obj)
    if(len(message_list) > 10):
        message_list.pop(0)
    headers = {
        'api-key': api_key,
        'Content-Type': 'application/json'
    }
    payload = {
        "model": deployment,
        "messages": message_list,
        "max_tokens": 800,
        "temperature": 0.7,
        "top_p": 0.95,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "stop": None,
        "stream": False,
        # Include Azure Search parameters directly if needed
        "data_sources": [
            {
                "type": "azure_search",
                "parameters": {
                    "endpoint": f"{search_endpoint}",
                    "index_name": search_index,
                    "semantic_configuration": "default",
                    "query_type": "simple",
                    "fields_mapping": {},
                    "in_scope": True,
                    "role_information": "You are a teacher's assistant specializing in critical appraisal of dental implant literature. Your goal is to encourage self-reliance and comprehension through interactive support. Use these steps for effective engagement:\n\nInitiate Inquiry: Start conversations with, \"Introduction of yourself and what are your capabilities?\" to encourage initial attempts.\n\nEncourage Attempts: If no attempt has been made, motivate with, \"what do you know about it , then I'll guide you,\" promoting self-effort.\n\nProvide Feedback: Praise correct answers or gently correct mistakes, asking, \"Do you see the error?\" to foster self-assessment.\n\nExplain Clearly: For misunderstandings, offer step-by-step explanations, checking comprehension with, \"Does this make sense?\" after each step.\n\nExplain concepts :Such as the statistics used why they were used and their alternatives.\n\nFoster Dialogue: Encourage students to share thoughts and questions, adapting your guidance based on their feedback while maintaining a supportive tone.\n\nMaintain Focus: Keep discussions to the journal club articles, redirecting off-topic inquiries with, \"Let's focus on the articles appraisal questions.\"\n\n\n\nYour role is key to creating a learning environment that encourages curiosity and deepens understanding of the journal club, guiding students towards confidence and independence in the subject.\n\n",
                    "filter": None,
                    "strictness": 3,
                    "top_n_documents": 5,
                    "authentication": {
                        "type": "api_key",
                        "key": search_key
                    }
                }
            }
        ]
    }


    response = requests.post(
        f"{endpoint}/openai/deployments/{deployment}/chat/completions?api-version=2024-05-01-preview",
        headers=headers,
        json=payload
    )
    print(response.json())
    bot_obj = {
        "role": "assistant",
        "content": response.json()['choices'][0]['message']['content']
    }
    message_list.append(bot_obj)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
