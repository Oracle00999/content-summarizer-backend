✨ AI-Powered Content Summarization API

Effortlessly distill lengthy articles, web pages, or raw text into concise summaries with this robust Node.js Express API. Leveraging advanced AI, it offers multiple summarization styles, making it an invaluable tool for quick information retrieval and content digestion. Designed for high performance and reliability, this project showcases professional backend development practices.

# Content Summarization API

## Overview
This is a Node.js Express.js API server engineered to provide versatile content summarization capabilities. It integrates with the OpenAI API for intelligent text processing and meticulously utilizes web scraping (Axios, Cheerio) to extract textual content from URLs. This setup delivers a powerful and flexible solution for both raw text and web page summarization.

## Features
- **Intelligent Summarization**: Seamlessly integrates with OpenAI's `gpt-4o-mini` model, ensuring high-quality and contextually relevant summaries.
- **Dynamic Content Extraction**: Automatically fetches and extracts primary textual content from provided URLs, effectively handling various web page structures via Cheerio and Axios.
- **Configurable Summarization Styles**: Offers a range of output styles including bullet points, casual explanations, headline-based summaries, and formal tones, catering to diverse requirements.
- **Comprehensive Error Handling**: Implements detailed error responses for URL fetching failures, content extraction issues, and API service timeouts, enhancing API reliability.
- **Cross-Origin Resource Sharing (CORS)**: Properly configured to facilitate secure cross-origin requests.
- **Request Timeout Mechanism**: Incorporates a 20-second request timeout to prevent server resource exhaustion and ensure prompt feedback to clients.

## Technologies Used

| Technology     | Description                                                          | Link                                              |
| :------------- | :------------------------------------------------------------------- | :------------------------------------------------ |
| **Node.js**    | JavaScript runtime environment for server-side execution             | [nodejs.org](https://nodejs.org/)                 |
| **Express.js** | Minimalist web application framework for Node.js                     | [expressjs.com](https://expressjs.com/)           |
| **OpenAI API** | AI platform providing access to advanced language models             | [openai.com](https://openai.com/api/)             |
| **Axios**      | Promise-based HTTP client for making requests                        | [axios-http.com](https://axios-http.com/)         |
| **Cheerio**    | Fast, flexible, and lean implementation of core jQuery for server    | [cheerio.js.org](https://cheerio.js.org/)         |
| **Dotenv**     | Module to load environment variables from a `.env` file              | [dotenv.org](https://www.npmjs.com/package/dotenv)|
| **CORS**       | Node.js middleware for enabling Cross-Origin Resource Sharing        | [github.com/expressjs/cors](https://github.com/expressjs/cors)|
| **Body-parser**| Node.js middleware for parsing incoming request bodies               | [www.npmjs.com/package/body-parser](https://www.npmjs.com/package/body-parser) |

## Getting Started
### Environment Variables
To operate this project, you are required to set the following environment variable in a `.env` file located at the project root:

`OPENAI_API_KEY="your_openai_api_key_here"`

**Example .env file:**
```dotenv
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## API Documentation
### Base URL
`http://localhost:3000/api/summarize`

### Endpoints
#### POST /api/summarize
Summarizes provided text content or extracts content from a given URL, then generates a summary based on a specified style.

**Request**:
```json
{
  "text": "string",
  "style": "string, optional"
}
```
**Fields**:
- `text` (string, **required**): The input content to be summarized. This field accepts either a block of raw text or a fully qualified URL (e.g., `https://www.example.com/article`).
- `style` (string, optional): Defines the desired format and tone of the summary.
  - Accepted values:
    - `"bullet"`: Produces a summary in concise bullet points.
    - `"casual"`: Generates a summary with a friendly, informal tone.
    - `"headline"`: Summarizes the content into short, bold headlines.
    - `"formal"`: Provides a summary in a professional and formal tone.
  - If this field is omitted, the API defaults to a concise summary that retains all key details.

**Example Request (Text Input)**:
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{
  "text": "The latest research indicates a significant breakthrough in renewable energy technology, specifically in enhancing solar panel efficiency. Scientists at the forefront of this innovation report a new material composite that allows for 30% more energy absorption compared to current market standards. This development promises to accelerate global transition towards sustainable energy sources.",
  "style": "bullet"
}' \
http://localhost:3000/api/summarize
```

**Example Request (URL Input)**:
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{
  "text": "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "style": "formal"
}' \
http://localhost:3000/api/summarize
```

**Response**:
```json
{
  "summary": "string"
}
```
**Example Success Response (Bullet Style)**:
```json
{
  "summary": "- Breakthrough in renewable energy technology announced.\n- New material composite enhances solar panel efficiency by 30%.\n- Promises to accelerate global transition to sustainable energy."
}
```
**Example Success Response (URL Input)**:
```json
{
  "summary": "This document provides a comprehensive overview of artificial intelligence, covering its historical development, foundational theories, and contemporary applications across various domains. It discusses the major subfields such as machine learning, natural language processing, and computer vision, while also addressing ethical considerations and future prospects."
}
```

**Errors**:
- `400 Bad Request`:
  - `{"error": "Failed to fetch URL. Try another link."}`: Occurs when the provided URL cannot be resolved or accessed, or if the HTTP request to the URL fails.
  - `{"error": "Couldn't extract readable content from this website. Please copy the text manually from the site and paste it here.", "suggestManual": true}`: Generated when the API is unable to parse and extract meaningful textual content from the HTML structure of the provided URL.
- `500 Internal Server Error`:
  - `{"error": "Failed to summarize content. Try again later."}`: A general error indicating a failure during the summarization process, potentially due to issues with the OpenAI API communication or an unhandled exception within the server logic.
- `504 Gateway Timeout`:
  - `{"error": "Request timed out."}`: Signifies that the server took longer than the allocated 20 seconds to process the request, which can happen with extensive web scraping or lengthy AI processing.

## Author
- **Your Name**: [LinkedIn](https://linkedin.com/in/yourusername) | [Twitter](https://twitter.com/yourusername) | [Portfolio](https://yourportfolio.com)

## License
This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

## Badges
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?logo=express&logoColor=white)](https://expressjs.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-informational?logo=openai&logoColor=white)](https://openai.com/api/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)