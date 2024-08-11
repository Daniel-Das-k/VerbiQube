import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Input from '../ui/Input';
import { CiSearch } from "react-icons/ci";
import { FaUpload } from 'react-icons/fa';
import fblogo from '../assets/fb.png';
import linklogo from '../assets/linkedin.png';
import insta from '../assets/insta.png';
import twitter from '../assets/twitter.jpg'; 
import disc from '../assets/disc.png';
import yt from '../assets/youtube.png';
import 'ldrs/bouncy';

const Container = styled.div`
  padding: 3rem 2rem 0 2rem;
`;

const SubContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FirstContainer = styled.div`
  display: flex;
  width: 50%;
  height: 85vh;
  border-radius: 12px;
  background: #2D2D2D;
  padding: 0rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SecondContainer = styled.div`
  width: 50%;
  height: 85vh;
  
  border-radius: 12px;
  background: #2D2D2D;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
`;

const NestedContainer = styled.div`
  margin-top: 3rem;
  height: 60vh;
  width: 300px;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

const Button = styled.button`
  padding: 10px;
  text-align: center;
  color: #fff;
  background: #171717;
  border-radius: 17px;
  width: 100%;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.2s linear; 
  margin-left: 2rem;
  text-transform: uppercase;
  &:hover {
    background: #fff;
    color: #000;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const FileUploadIcon = styled(FaUpload)`
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
`;
const P=styled.p`
height:40vh;
overflow-y:scroll;
overflow:hidden;

`
const Sample=styled.div`
margin-top:-3rem;
height:100%;
width:100%;

`
const P2=styled.p`

overflow-y:scroll;
overflow:hidden;

`
const Automation = () => {
  const [content, setContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [linkedinContent, setLinkedinContent] = useState('');
  const [twitterContent, setTwitterContent] = useState('');

  const [youtubeConnected, setYoutubeConnected] = useState(false);

  useEffect(() => {
    // Check if YouTube access token exists
    const checkYouTubeAccessToken = async () => {
      try {
        const youtubeResponse = await axios.get('http://localhost:5000/check_youtube_access');
        setYoutubeConnected(youtubeResponse.data.connected);
      } catch (error) {
        console.error('Error checking YouTube access token:', error);
      }
    };

    checkYouTubeAccessToken();
  }, []);
  useEffect(() => {
    // Check if Twitter access token exists
    const checkTwitterAccess = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check_twitter_access');
        if (response.data.connected) {
          setTwitterConnected(true);
        }
      } catch (error) {
        console.error('Error checking Twitter access:', error);
      }
    };

    checkTwitterAccess();
  }, []);
  const handleGenerateContent = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (content.includes('twitter')) {
      try {
        const response = await axios.post('http://localhost:5000/generate_tweet', {
          text: content
        });
        setTwitterContent(response.data.tweet);
      } catch (error) {
        console.error('Error generating tweet:', error.response ? error.response.data : error.message);
        alert('An error occurred while generating the tweet. Please check the console for details.');
      }
    } else if (content.includes('linkedin')) {
      try {
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        const response = await axios.post('http://localhost:5000/generate_linkedin_content', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.error) {
            console.error(response.data.error);
            alert('An error occurred while generating content.');
        } else {
            setLinkedinContent({
                content: response.data.content,
                imageUrl: response.data.image_url // Assuming this is the URL of the uploaded image
            });
        }
    } catch (error) {
        console.error('Error generating content:', error);
        alert('An error occurred while generating content.');
    }
} else if (content.includes('youtube')) {
  try {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('file', image);
    }

    const response = await axios.post('http://localhost:5000/youtube_upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.message) {
      setSuccess('Video uploaded successfully!');
      setGeneratedContent(response.data.message);
    } else {
      setError('An error occurred while uploading the video.');
    }
  } catch (error) {
    console.error('Error uploading video:', error);
    setError('An error occurred while uploading the video.');
  } finally {
    setLoading(false);
  }
}
setLoading(false)
  };


  const handlePostContent = async () => {
    if (content.includes('twitter')) {
      if (!twitterContent) {
        alert('No tweet content to post.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/post_tweet', {
          tweet: twitterContent
        });

        if (response.data.success) {
          alert(response.data.message || 'Tweet posted successfully!');
        } else {
          alert(response.data.message || 'An error occurred while posting the tweet.');
        }
      } catch (error) {
        console.error('Error posting tweet:', error.response ? error.response.data : error.message);
        alert('An error occurred while posting the tweet. Please check the console for details.');
      }
    } else if (content.includes('linkedin')) {
      if (!linkedinContent) {
        alert('No LinkedIn content to post.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('content', linkedinContent.content);
        if (image) {
            formData.append('image', image);
        }

        const response = await axios.post('http://localhost:5000/post_linkedin', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.success) {
            alert('Content posted successfully!');
        } else {
            alert('Failed to post content.');
        }
    } catch (error) {
        console.error('Error posting content:', error);
        alert('An error occurred while posting content.');
    }
  }
  };
  const handleDiscordConnect = async () => {
    try {
      const response = await axios.get("/discord/connect");
      if (response.data.success) {
        console.log("Discord connected successfully!");
      } else {
        console.error("Failed to connect to Discord:", response.data.message);
      }
    } catch (error) {
      console.error("Error during Discord connection:", error);
    }
  };

  const handleYouTubeConnect = async () => {
    try {
      const response = await axios.get('http://localhost:5000/youtube/connect');
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert('YouTube connection failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error connecting to YouTube:', error);
      alert('An error occurred while connecting to YouTube. Please check the console for details.');
    }
  };
  const handleTwitterConnect = () => {
    window.location.href = 'http://localhost:5000/start_twitter_oauth';
  };

  const handleLinkedInConnect = () => {
    window.location.href = 'http://localhost:5000/linkedin/login';
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Container>
      <SubContainer>
        <FirstContainer>
          {visible ? (
            <NestedContainer>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Img src={linklogo} />
                <Button onClick={handleLinkedInConnect}>Connect</Button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Img src={twitter} />
                <Button onClick={handleTwitterConnect}>
                  {twitterConnected ? 'Connected' : 'Connect'}
                </Button>
              </div>
              {/* <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-1rem" }}>
                <Img style={{ width: "100px", height: "100px", marginLeft: "-1.5rem" }} src={insta} />
                <div style={{ width: "100%" }}>
                  <Button style={{ width: "194px", marginLeft: "0.2rem", marginTop: "1.4rem", height: "7vh" }}>Connect</Button>
                </div>
              </div> */}
               <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0rem" }}>
                <Img src={fblogo} />
                <Button>Connect</Button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0rem" }}>
                <Img src={disc} />
                <Button onClick={handleDiscordConnect}>Connect</Button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                <Img src={yt} />
                <Button onClick={handleYouTubeConnect}>Connect</Button>
              </div>
             
            </NestedContainer>
          ) : (
            <div>{content && content}</div>
          )}
          <form onSubmit={handleGenerateContent}>
            <InputContainer>
              <FileUploadIcon onClick={() => document.getElementById('file-upload').click()} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <Input
                style={{ width: "500px", boxShadow: "0 0 5px 5px #171717", background: "#171717", color: "#fff" }}
                placeholder="Ask Anything"
                name="automater"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                type="text"
              />
              <button type="submit">
                <CiSearch style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "70px", height: "30px", marginLeft: "-5rem" }} />
              </button>
            </InputContainer>
          </form>
        </FirstContainer>
        <SecondContainer>
          <div>
            {loading ? (
              <>
               <l-bouncy
                    size="45"
                    speed="1.75"
                    color="#676767"
                  ></l-bouncy>
              </>
            ):(
              <>
                {twitterContent && !linkedinContent && (
            <>
              <Sample>
                <P2>{twitterContent}</P2>
              </Sample>
             
              <div style={{display:"flex",width:"100%",justifyContent:"end"}}>
              <Button style={{marginLeft:"-0.3rem",width:"200px"}}onClick={handlePostContent}>Post</Button>
              </div>
             </>
           )}
          {linkedinContent && (
            <><Sample>
              <P >{linkedinContent.content}</P>
            </Sample>
             
            {linkedinContent.imageUrl && (<>
              <div style={{display:"flex",width:"100%",marginTop:"-4rem",justifyContent:"center"}}>
              <Img style={{width:"150px",height:"150px"}} src={linkedinContent.imageUrl} alt="Generated" />
              </div>
            </>
              
            )}
            <div style={{display:"flex",width:"100%",justifyContent:"end"}}>
            <Button style={{marginLeft:"-0.3rem",width:"200px"}}onClick={handlePostContent}>Post</Button>
            </div>
        </> )}
              </>
            )
          }
        </div>
       </SecondContainer>
    </SubContainer>
    </Container>
  );
};

export default Automation;