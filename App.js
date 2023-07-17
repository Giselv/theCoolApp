import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 
  useEffect(() => {
  setMessages([
  {
        _id: 1,
        text: "Let's see how well you know SpongeBob! Say 'Yes' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
        },
      ]);
    }, 
    []);

    const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
    // console.log("PREVIOUS MESSAGES:", previousMessages);
    // console.log("NEW MESSAGE:", newMessages);
    return GiftedChat.append(previousMessages, newMessages);
    });
  };

    const addBotMessage = (text) => {
    console.log(text, currentQuestionIndex)
    addNewMessage([
    {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: CHATBOT_USER_OBJ,
    },
  ]);
};

     const questions = [
    {
      id: 1,
      text: "What is Spongebobs last name?",
      answer: "Squarepants",
    },
    {
      id: 2,
      text: "What city does he live in?",
      answer: "Bikini Bottom",
    },
    {
      id: 3,
      text: "When is his birthday? (mm-dd-year)",
      answer: "07-14-1986",
    },
    {
      id: 4,
      text: "What color are his eyes?",
      answer: "Blue",
    },
    {
      id: 5,
      text: "Who is Spongebobs' bestfriend?",
      answer: "Patrick",
    },
    {
      id: 6,
      text: "Where does spongebob work?",
      answer: "The Krusty Krab",
    },
    {
      id: 7,
      text: "Who is Spongebobs Boss?",
      answer: "Mr. Crabs",
    },
    {
      id: 8,
      text: "Who taught Spongebob how to drive?",
      answer: "Mrs. Puff",
    },
    {
      id: 9,
      text: "How old would spongebob be today?",
      answer: "37 years old",
    },
    {
      id: 10,
      text: "You've reached the end. Please refresh for next person.",
    },
    
    
];
    const respondToUser = (userMessages) => {
    const userMessageText = userMessages[0].text;

    console.log(userMessages[0].text, currentQuestionIndex)

    if (userMessageText === "yes"||userMessageText === "Yes") {
    const currentQuestion = questions[currentQuestionIndex];
    addBotMessage(currentQuestion.text);
  }

    else if (userMessageText === questions[currentQuestionIndex].answer) {
    addBotMessage("That's correct!");

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    console.log("set current")


    if (currentQuestionIndex + 1 < questions.length) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      addBotMessage(nextQuestion.text);
    } 
  }
    else {
      addBotMessage("Please try again...");
    //   addBotMessage("Trivia completed!");
    }
};


    const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
    }, []);

    return (
    <GiftedChat
    messages={messages}
    onSend={(messages) => {
    onSend(messages)
    setTimeout(() => respondToUser(messages), 1000);
    }}
    user={{
          _id: 1,
          name: "Baker",
    }}
      renderUsernameOnMessage={true}
  />
);
}