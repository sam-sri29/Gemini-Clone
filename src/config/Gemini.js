// const apiKey = "AIzaSyDGa0maljL3hZSzAjTt6UBQmL7eHOURIv8";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDGa0maljL3hZSzAjTt6UBQmL7eHOURIv8"); // 

export async function generateGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

  const result = await model.generateContent(prompt);
  const text =  result.response.text();
  console.log(text);
  return text;
}



export default generateGeminiResponse;
