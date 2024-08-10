import os
from dotenv import load_dotenv
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi

class YouTubeTranscriptSummarizer:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=self.api_key)

        self.prompt = """
        Provide a summary of the content in a concise 10-line paragraph. Include the most remarkable and lucky moments from the content, highlighting extraordinary feats, near misses, and surprising events. Ensure the paragraph captures the essence of the content, emphasizing key events and the overall theme of luck and chance. Avoid detailed lists or sections; focus on creating a coherent and engaging narrative.
        in one small para containg 50 words in total be precise
        """

    def extract_transcript_details(self, youtube_video_url):
        try:
            video_id = youtube_video_url.split("v=")[1]
            transcript_text = YouTubeTranscriptApi.get_transcript(video_id)
            transcript = " ".join([item["text"] for item in transcript_text])
            
            return transcript

        except Exception as e:
            raise e

    def generate_gemini_content(self, transcript_text=""):
        try:
            model = genai.GenerativeModel("gemini-pro")
            response = model.generate_content(self.prompt + transcript_text)
            
            return response.text

        except Exception as e:
            raise e

    def save_to_markdown(self, filename, content):
        try:
            with open(filename, 'w') as file:
                file.write(content)
            print(f"Summary saved to {filename}")

        except Exception as e:
            raise e
 
    def process_video(self, youtube_link):
        try :
            transcript_text = self.extract_transcript_details(youtube_link)
                        
            if transcript_text:
                summary = self.generate_gemini_content(transcript_text)
                output_directory = "outputs/ytVideoSummarizer"
                output_filename = os.path.join(output_directory, "youtube_summary.md")

                os.makedirs(output_directory, exist_ok=True)

                self.save_to_markdown(output_filename, summary)
                   
        except:
            # print(f"An error occurred: {e}")
            summary = self.generate_gemini_content()
            output_directory = "outputs/ytVideoSummarizer"
            output_filename = os.path.join(output_directory, "youtube_summary.md")

            os.makedirs(output_directory, exist_ok=True)

            self.save_to_markdown(output_filename, summary)

def main():
    summarizer = YouTubeTranscriptSummarizer()

    youtube_link = input("Enter YouTube Video Link: ")

    if youtube_link:
        summarizer.process_video(youtube_link)

if __name__ == "__main__":
    main()
