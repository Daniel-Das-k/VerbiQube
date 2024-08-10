from flask import Flask, render_template, request, jsonify
from langchain_community.agent_toolkits import GmailToolkit
from langchain import hub
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain.load import dumps, loads
from langchain_core.messages import AIMessage, HumanMessage
from dotenv import find_dotenv, load_dotenv
import os

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

from langchain_community.tools.gmail.utils import (
    build_resource_service,
    get_gmail_credentials,
)
os.environ["OPENAI_API_KEY"] = "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"

credentials = get_gmail_credentials(
    token_file="token.json",
    scopes=["https://mail.google.com/"],
    client_secrets_file="credentials.json",
)
api_resource = build_resource_service(credentials=credentials)
toolkit = GmailToolkit(api_resource=api_resource)

tools = toolkit.get_tools()

instructions = """You are an assistant that creates email drafts."""
base_prompt = hub.pull("langchain-ai/openai-functions-template")
prompt = base_prompt.partial(instructions=instructions)
llm = ChatOpenAI(temperature=0)
agent = create_openai_functions_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    return_intermediate_steps=True
)

def process_chat(agent_executor, user_input, chat_history):
    response = agent_executor.invoke({
        "input": user_input,
        "chat_history": chat_history
    })
    return [response["output"], response['intermediate_steps'][0]]

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/draft_email', methods=['POST'])
def draft_email():
    user_input = request.form['user_input']
    chat_history = request.form['chat_history']

    if chat_history:
        chat_history = loads(chat_history)  
    else:
        chat_history = []

    response = process_chat(agent_executor, user_input, chat_history)

    chat_history.append(HumanMessage(content=user_input))
    chat_history.append(AIMessage(content=response[0]))

    history = dumps(chat_history)  
    return jsonify({'output': response[0], 'chat_history': history, 'tool_input': response[1][0].tool_input['message']})

if __name__ == "__main__":
    app.run(debug=True)
