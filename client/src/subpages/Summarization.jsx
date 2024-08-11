import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Input from '../ui/Input';
import { CiSearch } from "react-icons/ci";
import 'ldrs/bouncy';

const Container = styled.div`
    display: flex;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background: #242424;
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

function Summarization() {
    const [youtubeLink, setYoutubeLink] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

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
        typeNextWord();
    };

    const handleSummarize = async () => {
        if (youtubeLink.trim()) {
            const newMessage = { text: youtubeLink, result: '', loading: true };
            setMessages([...messages, newMessage]);
            setYoutubeLink('');
    
            try {
                // Request to generate the summary
                const response = await axios.post('http://localhost:5000/summarize_youtube', { youtube_link: youtubeLink });
    
                // Fetch the summary file
                const res = await axios.get('http://localhost:5000/outputs/ytVideoSummarizer/youtube_summary.md');
                const summaryText = res.data;
    
                // Process the summary text
                let resultArray = summaryText.split("");
                let newArray = '';
                for (let i = 0; i < resultArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newArray += resultArray[i];
                    } else {
                        newArray += "<b>" + resultArray[i] + "</b>";
                    }
                }
                let newArray2 = newArray.split("*").join("<br/>");
                let newArray3 = newArray2.split("#").join("<br/>"); // Adjust this line for heading or new line
                let newArray4 = newArray3.split("undefined").join("<br/>");
    
                // Update the last message with the processed summary using typing effect
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = {
                        ...updatedMessages[updatedMessages.length - 1],
                        loading: false,
                        result: '',
                    };
                    return updatedMessages;
                });
    
                // Trigger the typing effect
                typeWords(newArray4.split(' '));
            } catch (error) {
                console.error(error);
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = {
                        ...updatedMessages[updatedMessages.length - 1],
                        loading: false,
                        result: 'Error: ' + (error.response?.data?.message || error.message),
                    };
                    return updatedMessages;
                });
            }
        }
    };
    

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Container>
            <Sidebar />
            <SubContainer>
                <Navbar />
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
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Input
                        required
                        placeholder={"Enter any YouTube Link"}
                        name="summarizer"
                        type="text"
                        value={youtubeLink}
                        onChange={(e) => { setYoutubeLink(e.target.value) }}
                    />
                    <button onClick={handleSummarize}>
                        <CiSearch style={{ width: "70px", height: "30px", marginLeft: "-5rem" }} />
                    </button>
                </div>
            </SubContainer>
        </Container>
    );
}

export default Summarization;
