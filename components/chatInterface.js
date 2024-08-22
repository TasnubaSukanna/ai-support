'use client';
import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { fetchAIResponse } from '../lib/gemini';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const initialBotResponse = "Hello! I'm here to listen. How are you feeling today? What's on your mind?";

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const aiResponse = await determineResponse(input);
            const botMessage = { sender: 'bot', text: aiResponse };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setInput(''); // Clear input
    };

    const determineResponse = async (userInput) => {
        const greetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon'];
        const lowerCaseInput = userInput.toLowerCase();

        if (greetings.some(greeting => lowerCaseInput.includes(greeting))) {
            return initialBotResponse;
        } else {
            return await fetchAIResponse(userInput);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', p: 2 }}>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    ADHD Support Assistant
                </Typography>
                <List sx={{ maxHeight: 400, overflowY: 'auto', mb: 2 }}>
                    {messages.map((msg, index) => (
                        <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                            <Paper
                                sx={{
                                    p: 1,
                                    bgcolor: msg.sender === 'user' ? '#4A90E2' : '#F9E79F',
                                    color: msg.sender === 'user' ? 'white' : 'black',
                                    borderRadius: 2,
                                }}
                            >
                                <ListItemText primary={msg.text} />
                            </Paper>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSend}
                        sx={{ ml: 1 }}
                    >
                        Send
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatInterface;
