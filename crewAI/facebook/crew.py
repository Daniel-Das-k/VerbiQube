
from crewai import Crew, Process
from agents import (
    facebook_draft_refine_agent,
    facebook_seo_compiler_agent
)
from tasks import (
    drafting_refinement_task_facebook,
    seo_compilation_task_facebook
)

class Facebook:
    def __init__(self):
        self.crew = Crew(
            agents=[facebook_draft_refine_agent, facebook_seo_compiler_agent],
            tasks=[drafting_refinement_task_facebook, seo_compilation_task_facebook],
            process=Process.sequential,
            memory=False,
            cache=True,
            max_rpm=100,
            share_crew=True
        )

    def run(self, content):
        if len(content) > 1:
            result = self.crew.kickoff(inputs={'topic': content})
            # print(result)
            return result

if __name__ == "__main__":
    generator = Facebook()

    text = input("Enter the topic for the Facebook post: ")

    result = generator.run(content=text)
    print(result)

