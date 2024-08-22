import axios from 'axios';

const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

const strategies = {
    focus: "You may benefit from using the Pomodoro Technique to stay focused. Work in 25-minute intervals with short breaks.",
    organization: "Try using a visual calendar with color-coded tasks to help you stay organized throughout the day.",
    procrastination: "Consider breaking tasks into smaller, manageable parts and setting short deadlines for each part. Reward yourself after completing each part.",
    time_management: "Use time boxing or the Eisenhower Matrix to prioritize tasks and manage your time effectively.",
    motivation: "Identify your key motivators and align your tasks with these. You can also set up small rewards for completing challenging tasks.",
    overwhelm: "When feeling overwhelmed, start with a simple two-minute takeoff. Focus on just getting started, and the rest will follow.",
    emotional_regulation: "Practice mindfulness and grounding techniques. Regular breaks and physical activity can also help manage emotional dysregulation.",
    impulsivity: "Implement a pause-and-reflect strategy. Before acting on an impulse, take a moment to consider the consequences.",
    hyperfocus: "Set timers to remind yourself to take breaks. This will help prevent hyperfocus from consuming too much time on a single task.",
    social_interaction: "Practice active listening and set boundaries for conversations to avoid drifting off during social interactions.",
    stress_management: "Incorporate regular self-care activities, such as deep breathing exercises, stretching, or meditation, into your routine.",
    financial_impulsivity: "Create a budget and stick to it. Use apps that can track your spending and set alerts for when you're approaching your limits."
    // Add more strategies as needed...
};

export const fetchAIResponse = async (prompt) => {
    // Check if the prompt matches any predefined strategy
    const lowerPrompt = prompt.toLowerCase();
    
    for (const [keyword, response] of Object.entries(strategies)) {
        if (lowerPrompt.includes(keyword)) {
            return response;
        }
    }

    // If no predefined strategy matches, use the API to generate a response
    const adhdPrompt = `As an AI support assistant for managing ADHD, please recommend strategies for the following: ${prompt}. Use a supportive and empathetic tone.`;

    try {
        const response = await axios.post(
            API_URL,
            {
                prompt: adhdPrompt,
                temperature: 0.7, // Adjust the temperature as needed
                top_k: 5, 
                top_p: 0.9,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GEMINIAI_API_KEY}`, // Ensure this key is set correctly in your environment variables
                    'Content-Type': 'application/json',
                },
            }
        );

        // Assuming response.data has a message key with the content
        return response.data.message || "I'm here to help, but I didn't quite get that. Could you rephrase?";
    } catch (error) {
        console.error('AI request failed:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
};
