import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export const chatCompletion = async (
  messages: ChatCompletionRequestMessage[]
) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages,
    temperature: 0.7,
    max_tokens: 1224,
  });

  return completion?.data.choices[0].message?.content;
};
