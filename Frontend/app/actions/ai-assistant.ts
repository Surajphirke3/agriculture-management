import axios from 'axios';

export async function getAIResponse(message: string) {
    // Fetch API Key from environment variables
    const apiKey = process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

    if (!apiKey) {
        console.error(" Mistral API key is missing! Ensure MISTRAL_API_KEY is set in your .env.local file.");
        throw new Error("Mistral API key is missing. Please set MISTRAL_API_KEY in your environment variables.");
    }

    console.log(" Using MISTRAL_API_KEY:", apiKey ? "Exists " : "Missing ");

    const model = mistral("mistral-small-latest");
    const prompt = `You are an AI farming assistant. The user asks: "${message}". Provide a helpful response.`;
    const temperature = 0.7;

    try {
        const response = await generateText({ model, prompt, temperature, apiKey });
        return response;
    } catch (error) {
        console.error(" Error while generating AI response:", error);
        throw new Error("Failed to generate AI response.");
    }
}

async function generateText({ model, prompt, temperature, apiKey }: { model: string; prompt: string; temperature: number; apiKey: string }) {
    const url = `https://api.mistral.ai/v1/generate`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    const data = { model, prompt, temperature };

    try {
        const response = await axios.post(url, data, { headers });
        console.log("AI Response:", response.data);
        return response.data.choices[0].text;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(" Axios Error:", error.message);
            throw new Error(`Failed to generate text: ${error.message}`);
        } else {
            console.error(" Unknown Error:", error);
            throw new Error('Failed to generate text: An unknown error occurred.');
        }
    }
}

// Function to handle model selection (keeps code modular)
function mistral(modelName: string) {
    return modelName;
}
