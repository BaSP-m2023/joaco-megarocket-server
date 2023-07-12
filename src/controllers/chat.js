import { Configuration, OpenAIApi } from 'openai';

const eventChat = async (req, res) => {
  const main = req.body;

  const configuration = new Configuration({
    organization: 'org-BKLjnhDjR1cIM7n9xhmodEWs',
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are a helpful assistant for a gym, your role is to assist 'black membership' members of the gym. You can create meal plans, workout plans, and answer questions about the gym. If you are asked something unrelated to the gym, you can respond with 'I don't understand the question.",
        },
        ...main.messages,
      ],
      temperature: main.temperature || 1,
    });
    return res.status(201).json({
      message: 'Success',
      data: completion.data,
      error: false,
    });
  } catch (e) {
    return res.status(400).json({
      message: e,
      data: undefined,
      error: true,
    });
  }
};
export default eventChat;
