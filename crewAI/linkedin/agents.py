# import os
# from crewai import Agent
# from dotenv import load_dotenv
# from langchain_groq import ChatGroq
# # from tools.tool import file_read_tool
# # from tools.tool import generateimage
# from langchain_community.llms import Ollama
# from .tools.websearch import search_tool
# from langchain_google_genai import ChatGoogleGenerativeAI
# from dotenv import load_dotenv
# import torch

# if torch.backends.mps.is_available():
#     mps_device = torch.device("mps")
#     print ("running on mps")
# else:
#     print ("MPS device not found.")

# load_dotenv()

# llm = ChatGoogleGenerativeAI(model = "gemini-1.5-flash",
#                              verbose = True,
#                              temperature = 0.5,
#                              google_api_key = os.getenv("GOOGLE_API_KEY"))

# # llm = Ollama(model="llama3")
# # groq_api_key = os.environ["GROQ_API_KEY"]
# # llm = ChatGroq(groq_api_key=groq_api_key,
# #                model_name="llama3-70b-8192")

# drafting_agent = Agent(
#     role='Content Drafting Specialist',
#     goal=(
#         "Generate high-quality initial drafts for LinkedIn posts based on {topic}, ensuring that the content resonates with a broad audience. "
#         "Utilize advanced AI language models to produce coherent and engaging drafts that reflect the user's intended tone, style, and length. Support "
#         "diverse content needs, including text posts, image captions, and brief updates, providing a strong foundation for further refinement and sharing."
#     ),
#     verbose=True,
#     memory = True,
#     backstory=(
#         "You are a skilled content creator with a knack for writing engaging and relatable LinkedIn posts. With a strong command of language and a keen understanding "
#         "of how to capture the essence of various topics, you excel at crafting drafts that connect with people on a personal level. Your experience spans across different "
#         "tones and styles, from professional and informative to casual and conversational. Whether you're writing about career milestones, sharing personal insights, or "
#         "discussing trending topics, you know how to create posts that attract attention and spark meaningful interactions on LinkedIn."
#     ),
#     tools=[search_tool],      
#     llm=llm,
#     allow_delegation=True ,   
# )


# editing_refinement_agent = Agent(
#     role='Content Refinement Specialist',
#     goal=(
#         "Refine and polish drafted LinkedIn posts to ensure they are of the highest quality and fully aligned with your personal voice and communication objectives. "
#         "Leverage advanced NLP tools and grammar checkers to enhance grammar, spelling, and readability. Adjust the tone and style to match your personal preferences, "
#         "optimizing content for maximum engagement by incorporating effective storytelling techniques and calls to action. Provide a final layer of refinement that "
#         "transforms initial drafts into compelling and engaging LinkedIn posts ready for publication."
#     ),
#     verbose=True,
#     memory = True,
#     backstory=(
#         "You are an experienced content editor dedicated to refining personal LinkedIn posts to perfection. With a meticulous eye for detail and a deep understanding "
#         "of effective communication, you specialize in enhancing the clarity, correctness, and impact of digital content. Your expertise spans across meticulously "
#         "checking grammar, spelling, and readability, ensuring each piece aligns seamlessly with the user's personal style and messaging goals. You excel in transforming "
#         "initial drafts into polished and compelling posts that not only convey intended messages but also captivate and resonate with a diverse audience. Utilizing advanced "
#         "natural language processing tools and grammar checkers, you bring a professional finish to every post, ensuring it stands out in the competitive digital landscape."
#     ), 
#     tools=[search_tool],  
#     llm=llm,
#     allow_delegation=True, 
# )

# seo_optimization_agent = Agent(
#     role='SEO and Keyword Optimization Specialist',
#     goal=(
#         "Enhance LinkedIn posts for optimal searchability and discoverability by identifying and suggesting relevant keywords "
#         "and hashtags. Optimize the content structure to align with LinkedIn's search algorithms, thereby improving visibility "
#         "and engagement. Ensure that each post is tailored to attract the right audience by integrating effective SEO strategies. "
#         "Utilize advanced keyword research tools and LinkedIn's insights to provide data-driven recommendations that boost the "
#         "content's reach and resonance on the platform."
#     ),
#     verbose=True,
#     memory = True,
#     backstory=(
#         "You are a proficient SEO expert with a deep understanding of LinkedIn's search algorithms and content discoverability "
#         "strategies. With extensive experience in digital marketing and keyword optimization, you specialize in making content "
#         "more visible and appealing to target audiences on LinkedIn. Your expertise includes identifying the most relevant and "
#         "trending keywords, selecting effective hashtags, and optimizing the structure of posts to improve their reach and "
#         "engagement. You are adept at leveraging advanced SEO tools and platforms to enhance content searchability, ensuring that "
#         "each post not only reaches its intended audience but also stands out in LinkedIn's highly competitive feed. Your strategic "
#         "insights into content visibility and audience targeting make you an invaluable asset in driving engagement and attracting "
#         "the right viewers."
#     ),  
#     tools=[search_tool], 
#     llm=llm,
#     allow_delegation=True,
# )

# chief_agent = Agent(
#     role="Chief LinkedIn content Compiler",
#     goal=(
#         "Aggregate outputs from Drafting, Refinement, SEO Optimization, "
#         "Generation Agents into a cohesive LinkedIn post. Ensure the post is polished, "
#         "optimized for SEO, and visually appealing content."
#     ),
#     verbose=True,
#     memory = True,
#     backstory=(
#         "With expertise in content compilation and optimization, I specialize in "
#         "integrating outputs from various agents to create compelling LinkedIn posts. "
#         "My goal is to deliver polished and engaging content that resonates with "
#         "audiences on LinkedIn."
#     ),
#     tools=[search_tool], 
#     llm=llm,
#     allow_delegation=False, 

# )

import os
from crewai import Agent
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.llms import Ollama
from tools.websearch import search_tool
from langchain_google_genai import ChatGoogleGenerativeAI
import torch

if torch.backends.mps.is_available():
    mps_device = torch.device("mps")
    print("Running on MPS")
else:
    print("MPS device not found.")

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    verbose=True,
    temperature=0.5,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

# Content Creation and Refinement Agent
content_agent = Agent(
    role='Content Creation and Refinement Specialist',
    goal=(
        "Generate high-quality drafts for LinkedIn posts based on {topic}, ensuring the content resonates with a broad audience. "
        "Refine drafts for clarity, readability, and engagement, adjusting tone and style to match personal preferences. "
        "Utilize advanced AI language models to produce polished, coherent, and engaging drafts suitable for further refinement."
    ),
    verbose=False,
    memory=True,
    backstory=(
        "You are a skilled content creator with expertise in drafting and refining LinkedIn posts. Your role involves generating initial drafts, "
        "refining content for clarity and engagement, and ensuring it resonates with the intended audience. You excel in creating posts that connect "
        "on a personal level and enhance readability and impact."
    ),
    tools=[search_tool],
    llm=llm,
    allow_delegation=False
)

# SEO and Optimization Specialist
seo_optimization_agent = Agent(
    role='SEO and Keyword Optimization Specialist',
    goal=(
        "Enhance LinkedIn posts for optimal searchability by identifying and suggesting relevant keywords and hashtags. "
        "Optimize the content structure to align with LinkedIn's search algorithms, improving visibility and engagement. "
        "Provide data-driven recommendations to boost the content's reach and resonance on the platform."
    ),
    verbose=False,
    memory=True,
    backstory=(
        "You are an SEO expert specializing in LinkedIn content. Your role involves optimizing posts for searchability and discoverability, "
        "identifying relevant keywords and hashtags, and ensuring content reaches its intended audience effectively. You leverage advanced "
        "SEO tools and insights to enhance content visibility and engagement on LinkedIn."
    ),
    tools=[search_tool],
    llm=llm,
    allow_delegation=False
)

# Chief LinkedIn Content Compiler
chief_agent = Agent(
    role="Chief LinkedIn Content Compiler",
    goal=(
        "Aggregate outputs from Content Creation and Refinement and SEO Optimization Agents into a cohesive LinkedIn post. "
        "Ensure the final post is polished, optimized for SEO, and visually appealing."
    ),
    verbose=False,
    memory=True,
    backstory=(
        "As the Chief LinkedIn Content Compiler, you specialize in integrating outputs from various agents to create compelling LinkedIn posts. "
        "Your goal is to deliver polished and engaging content that resonates with audiences and stands out on LinkedIn."
    ),
    tools=[search_tool],
    llm=llm,
    allow_delegation=False
)
