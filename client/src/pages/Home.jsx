import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { TbSettingsAutomation } from "react-icons/tb";
import { MdSummarize } from "react-icons/md";
import { MdPlagiarism } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import vqlogo from '../assets/vq.png'
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context.jsx';
import { MdHistoryToggleOff } from "react-icons/md";
import 'ldrs/bouncy';
import Input from '../ui/Input.jsx';
const Container = styled.div`
  display: flex;
  background: #242424;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 30vh;
  margin: 0 2rem;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  color: #b4b4b4;
  background: #171717;
  box-shadow: 0 0 5px 5px #171717;
  transition: 0.3s linear;
  &:hover {
    box-shadow: 0 0 5px 5px #676767;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const FlexContainer = styled.div`
  display: flex;
`;

// const Input = styled.input`
//   padding: 1rem;
//   width: 50%;
//   border-radius: 30px;
//   margin: 2rem 1rem;
//   background: #424242;
//   color: #fff;
//   border: none;
//   outline: none;
//   box-shadow: 0 0 4px 4px #424242;
// `;

const FlexContainerSub = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow-y: auto;
  max-height: 500px;
  padding: 2rem;
`;

const MessageContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  width: 100%;
  align-self: flex-end;
`;

const MessageContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  max-width: 820px;
  align-self: flex-start;
`;

const P = styled.p`
  padding: 1rem 1.5rem;
  background: #424242;
  border-radius: 30px;
  font-size: 17px;
  letter-spacing: 1px;
`;

const P2 = styled.p`
  padding: 1rem 1.5rem;
  background: #424242;
  border-radius: 30px;
  font-size: 17px;
  letter-spacing: 1px;
`;

const Content = ({ name, content, icon }) => {
  const navigate = useNavigate();
  return (
    <ContentContainer onClick={() => navigate(`/${name}`)}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <p style={{ fontSize: "40px", display: "flex", justifyContent: "center" }}>{icon}</p>
        <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
          {name}
        </p>
      </div>
      <p style={{ margin: "2rem 0" }}>
        {content}
      </p>
    </ContentContainer>
  );
};

const Home = () => {
  const { messages, setMessages, visible, setVisible, generate, prevPrompts, setPrevPrompts, input, setInput } = useContext(Context);
  
  const messagesEndRef = useRef(null);

  const handleVisibility = async () => {
    if (input.trim()) {
      setVisible(false);
      const newMessage = { text: input, result: '', loading: true };
      setMessages([...messages, newMessage]);
      setInput('');
      setPrevPrompts(prev => [...prev, input]);
      // Generate result
      const result = await generate(input);

      let resultArray = result.split("");
      let newArray = '';
      for (let i = 0; i < resultArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newArray += resultArray[i];
        } else {
          newArray += "<b>" + resultArray[i] + "</b>";
        }
      }
      let newArray2 = newArray.split("*").join("<br/>");
      let newArray3 = newArray2.split("undefined").join("<br/>");

      // Initialize the typing effect
      const newResponseArray = newArray3.split(" ");
      typeWords(newResponseArray);

      // Update the last message with the result and stop loading
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          loading: false,
        };
        return updatedMessages;
      });
    }
  };

  const typeWords = (words) => {
    let currentWordIndex = 0;
    const typeNextWord = () => {
      if (currentWordIndex < words.length) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const currentResult = updatedMessages[updatedMessages.length - 1].result || '';
          const nextWord = words[currentWordIndex] + ' ';
          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            result: currentResult + nextWord,
          };
          return updatedMessages;
        });
        currentWordIndex++;
        setTimeout(typeNextWord, 70);
      }
    };
    // Start with the first word
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = {
        ...updatedMessages[updatedMessages.length - 1],
        result: words.length > 0 ? words[0] + ' ' : '', // Ensure we start with the first word
      };
      return updatedMessages;
    });
    typeNextWord();
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVisibility();
    }
  };

  return (
    <Container>
      <Sidebar />
      <SubContainer>
        <Navbar />
        {visible ? (
          <FlexContainerSub>
            <div style={{ display: "flex", justifyContent: "center", margin: "-3rem 0 3rem 0", fontSize: "60px" }}>
              <img src={vqlogo} alt='logo'/>
            </div>
            <FlexContainer>
              <Content
                icon={<TbSettingsAutomation />}
                content="Automate social media apps to schedule posts, analyze engagement, manage multiple accounts, and boost efficiency with AI-driven tools."
                name="Automation"
              />
              <Content
                icon={<MdSummarize />}
                content="Summarize videos and texts quickly with AI tools, condensing key points to save time and enhance understanding efficiently."
                name="Summarization"
              />
              <Content
                icon={<MdPlagiarism />}
                content="Detect plagiarism in videos and texts using AI-driven, web-based tools for comprehensive analysis and accurate results."
                name='Plagiarism'
              />
            </FlexContainer>
          </FlexContainerSub>
        ) : (
          <SecondContainer>
            {messages.map((message, index) => (
              <div key={index}>
                {message.text && (
                  <MessageContainerRight>
                    <P>{message.text}</P>
                  </MessageContainerRight>
                )}
                {message.loading && (
                  <l-bouncy
                    size="45"
                    speed="1.75"
                    color="#676767"
                  ></l-bouncy>
                )}
                {!message.loading && message.result && (
                  <MessageContainerLeft>
                    <P2 dangerouslySetInnerHTML={{ __html: message.result }} />
                  </MessageContainerLeft>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </SecondContainer>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Input
            required
            type='text'
            placeholder='Message Verbique'
            name='textbox'
            value={input}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            style={{ alignSelf: 'flex-end' }} // Align input field to the right
          />
          <button onClick={handleVisibility}>
            <CiSearch style={{ width: "70px", height: "30px", marginLeft: "-5rem" }} />
          </button>
        </div>
      </SubContainer>
    </Container>
  );
};

export default Home;