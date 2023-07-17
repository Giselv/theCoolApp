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
        text: "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
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
          text: "Which Disney princess has a pet tiger named Rajah?",
          answer: "Jasmine",
    },
    {
      id: 2,
      text: "Great, what food am i currently craving?",
      answer: "sushi",
    },
    {
      id: 3,
      text: "What is my favorite color?",
      answer: "",
    },
    {
      id: 4,
      text: "What is the name of the street where Aladdin lives?",
      answer: "Agrabah",
    },
    {
      id: 5,
      text: "Who is Simba's wise and trusted advisor in 'The Lion King'?",
      answer: "Rafiki",
    },
];


    const respondToUser = (userMessages) => {
    const userMessageText = userMessages[0].text;

    console.log(userMessages[0].text, currentQuestionIndex)

    if (userMessageText === "yes"||userMessageText === "Yes") {
    const currentQuestion = questions[currentQuestionIndex];
    addBotMessage(currentQuestion.text);
    // } else {
    //   addBotMessage("Please type 'Yes' to start.");
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
      addBotMessage("Please type 'Yes' to start.");
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