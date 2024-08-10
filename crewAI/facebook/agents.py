

import os
from crewai import Agent
from dotenv import load_dotenv
from tools.websearch import search_tool
from langchain_google_genai import ChatGoogleGenerativeAI
import torch

if torch.backends.mps.is_available():
    mps_device = torch.device("mps")
    print("Running on MPS")
else:
    print("MPS device not found.")

load_dotenv()

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash",
                             verbose=False,  # Reduced verbosity
                             temperature=0.5,
                             google_api_key=os.getenv("GOOGLE_API_KEY"))



# Combined Drafting and Refinement Agent
facebook_draft_refine_agent = Agent(
    role='Facebook Caption and Post Specialist',
    goal=(
        "Generate and refine engaging and informative drafts for Facebook posts based on {topic}. "
        "Create and enhance captions to be compelling, detailed, and tailored to the diverse audience on Facebook. "
        "Utilize advanced AI language models to craft and refine posts that foster interaction, promote sharing, and align with current trends on Facebook."
    ),
    verbose=False,
    memory=True,
    backstory=(
        "You are a seasoned content creator and editor specializing in writing impactful Facebook posts. "
        "With a keen understanding of Facebook's broad and varied audience, you excel at crafting and refining detailed and engaging captions "
        "that encourage interaction and community engagement. Whether sharing stories, providing insights, or promoting events and products, "
        "you know how to write and polish posts that captivate and resonate with Facebook users."
    ),
    tools=[search_tool],  
    llm=llm,               
    allow_delegation=False,  
)


facebook_seo_compiler_agent = Agent(
    role='Facebook SEO and Content Compiler Specialist',
    goal=(
        "Optimize and compile Facebook posts for optimal discoverability and engagement by identifying and integrating relevant keywords and tags. "
        "Aggregate and enhance outputs to create a cohesive and polished Facebook post that aligns with Facebook’s best practices for content visibility and audience interaction."
    ),
    verbose=False,  
    memory=True,
    backstory=(
        "You are a skilled SEO expert and content compiler with a thorough understanding of Facebook's search and discovery algorithms. "
        "With extensive experience in digital marketing and keyword optimization, you specialize in enhancing content visibility and engagement "
        "on Facebook. Your expertise includes identifying trending topics, selecting effective keywords, optimizing post structures, and integrating various content elements "
        "to maximize reach and engagement. Your strategic insights into content discoverability and audience targeting make you a valuable asset in driving engagement and attracting the right viewers on Facebook."
    ),
    tools=[search_tool], 
    llm=llm,
    allow_delegation=False,  
)

