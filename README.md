# JournalClub AI Assistant: Enhancing Journal Reading with Azure OpenAI

## Overview

JournalClub AI Assistant is a Python-based web application built on Flask. It assists JournalClub residents in reading academic journals more effectively. The assistant leverages Azure OpenAI to search content, summarize journals, and generate audio responses, making it easier to focus on key points and understand complex articles.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Before installing the software, ensure you have:

- Python 3.12 installed
- An IDE or code editor for updating and running the project
- Necessary API keys, which should be placed in specific files as outlined below:

  - ![Image](https://github.com/user-attachments/assets/d3d339c2-1a99-43ea-ac09-5493f4dd313f)
  - Add all required keys in `app.py`
  - Update the model code for your Retrieval-Augmented Generation (RAG) setup to ensure it runs properly.
  - Create a `.env` file and store all sensitive keys there for security.
  - ![Image](https://github.com/user-attachments/assets/66790caa-f0fe-4472-b1bb-adf8d1e2a0b7)
  - Include these keys in `speech.js`

### Built With

This project uses the following major frameworks and libraries:

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="32" alt="Python logo" />
  <img width="7" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" height="32" alt="Azure logo" />
  <img width="7" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="32" alt="HTML5 logo" />
  <img width="7" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="32" alt="CSS3 logo" />
  <img width="7" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="32" alt="JavaScript logo" />
  <img width="7" />
</div>

### Installation

To set up the development environment, follow these steps:

1. Clone the repository:
   $ git clone <repo-link>
2. Navigate to the project directory:
   $ cd <repo-directory>
3. Install the required Python packages:
   $ pip install -r requirements.txt
4. Run the application:
   $ python app.py
5. Open your web browser and go to: http://localhost:5000

## Usage

To use the JournalClub AI Assistant, follow these steps:

1. **Interacting with the AI:**
   - Open your web browser and navigate to [http://localhost:5000](http://localhost:5000).
   - You will see the main interface where you can input your queries about the journal content.

2. **Asking Questions:**
   - Type your questions or keywords related to the journal content into the input field.
   - Click the submit button or press Enter to send your query to the AI.

3. **Hearing Responses:**
   - To hear the AI-generated response, use the microphone button available on the interface.
   - The response will be played through the media player integrated into the application.
   - You can control the playback timing of the audio using the media player's controls.

4. **Viewing Summaries:**
   - The AI can provide summaries of journal articles. After entering a query, look for a summary section in the response.
   - Summaries will highlight the key points and findings from the journal.

5. **Searching Content:**
   - Utilize the search functionality to locate specific sections or topics within the journal.
   - Enter keywords or phrases related to the topic you're interested in, and the AI will return relevant excerpts.

## Configuration

To configure the application:

1. **API Keys:**
   - Ensure all necessary API keys are added to `app.py` and `.env` for secure access to services.
   - API keys for Azure OpenAI and other services should be correctly set in these files.

2. **Environment Variables:**
   - Create a `.env` file in the project root directory.
   - Add environment variables such as API keys and other configurations required by the application.

3. **Model Code Updates:**
   - If you are using a custom RAG (Retrieval-Augmented Generation) model, update the model code in `app.py` to match your specific configuration.

## Troubleshooting

If you encounter issues, try the following steps:

1. **Check Logs:**
   - Review the application logs for any error messages. Logs are typically displayed in the terminal where you ran `python app.py`.

2. **Verify API Keys:**
   - Ensure all API keys are correctly set in `app.py` and `.env`. Incorrect or missing keys can prevent the application from functioning properly.

3. **Dependencies:**
   - Make sure all dependencies are installed by running `pip install -r requirements.txt` again.

4. **Browser Issues:**
   - If you experience issues with the web interface, try clearing your browser cache or using a different browser.

## Demo



https://github.com/user-attachments/assets/00320681-86fc-4d31-b648-0bc3d6ae284d


