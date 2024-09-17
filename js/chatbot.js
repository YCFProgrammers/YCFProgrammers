import { AICore } from './aicore.js';

export class Chatbot {
  constructor() {
    this.aiCore = new AICore();
    this.conversationHistory = [];
    this.contextWindow = 5; // Number of previous messages to consider for context
  }

  async handleUserInput(userInput) {
    try {
      // Add context from previous messages
      const context = this.getContext();
      const contextualInput = `${context}\nUser: ${userInput}`;

      const response = await this.aiCore.generateResponse(contextualInput);
      this.conversationHistory.push({ user: userInput, bot: response });
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'An error occurred. Please try again.';
    }
  }

  getContext() {
    const recentMessages = this.conversationHistory.slice(-this.contextWindow);
    return recentMessages.map(msg => `User: ${msg.user}\nBot: ${msg.bot}`).join('\n');
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  exportConversation() {
    return JSON.stringify(this.conversationHistory, null, 2);
  }

  async improveResponse(userInput, originalResponse) {
    // Implement logic to improve the response based on user feedback
    const improvedResponse = await this.aiCore.generateResponse(`Improve this response: "${originalResponse}" for the user input: "${userInput}"`);
    return improvedResponse;
  }

  async answerFollowUpQuestion(userInput) {
    const context = this.getContext();
    const contextualInput = `${context}\nUser: ${userInput}\nPlease provide a detailed answer to this follow-up question.`;
    const response = await this.aiCore.generateResponse(contextualInput);
    return response;
  }
}
