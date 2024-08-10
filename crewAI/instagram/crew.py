# from crewai import Crew ,Process
# from agents import instagram_content_compiler,instagram_content_formatter,instagram_drafting_agent,instagram_image_creator,instagram_refinement_agent,instagram_seo_agent
# from tasks import drafting_task_instagram,editing_task_instagram,seo_task_instagram,chief_task_instagram,image_generate_task_instagram,format_content_task_instagram

# class Instagram:
#     def __init__(self):
#         # self.voice_assistant = voice_assistant
#         self.crew = Crew(
#             agents=[instagram_drafting_agent,instagram_refinement_agent,instagram_seo_agent,instagram_content_compiler,instagram_image_creator,instagram_content_formatter],
#             tasks=[drafting_task_instagram,editing_task_instagram,seo_task_instagram,chief_task_instagram,image_generate_task_instagram,format_content_task_instagram],
#             process=Process.sequential,
#             memory=False,
#             cache=True,
#             max_rpm=100,
#             share_crew=True
#         )

#     def run(self,content):
#         # self.voice_assistant.speak("Say the Topic: ")
#         # text = self.voice_assistant.get_audio()
#         if len(content) > 1:
#             result = self.crew.kickoff(inputs={'topic': content})
#             print(result)

# if __name__ == "__main__":
#     generator = Instagram()

#     text = input("Enter the topic for the Facebook post: ")

#     result = generator.run(topic=text)
#     print(result)

from crewai import Crew, Process
from agents import instagram_drafting_agent,instagram_refinement_seo_agent
from tasks import drafting_task_instagram, refinement_seo_task_instagram

class Instagram:
    def __init__(self):
        self.crew = Crew(
            agents=[
                instagram_drafting_agent, 
                instagram_refinement_seo_agent, 
                
            ],
            tasks=[
                drafting_task_instagram, 
                refinement_seo_task_instagram, 
                
            ],
            process=Process.sequential,
            memory=False,
            cache=True,
            max_rpm=100,
            share_crew=True
        )

    def run(self, content):
        if len(content) > 1:
            result = self.crew.kickoff(inputs={'topic': content})
            return result

if __name__ == "__main__":
    generator = Instagram()

    topic = input("Enter the topic for the Instagram post: ")

    result = generator.run(content=topic)
    print(result)
