export const parseModelResponse = (gptResponse: string) => {
  try {
    const startIndex = gptResponse.indexOf("{");
    const endIndex = gptResponse.lastIndexOf("}") + 1;
    const jsonContent = gptResponse.substring(startIndex, endIndex);
    const parsedJSON = JSON.parse(jsonContent);
    return parsedJSON;
  } catch (error) {
    console.error("Failed to parse JSON", { error, gptResponse });
    throw new Error();
  }
};
