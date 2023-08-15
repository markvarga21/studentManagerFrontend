import {
  FormRecognizerClient,
  AzureKeyCredential,
} from "@azure/ai-form-recognizer";

const endpoint = "https://usermanagerformservice.cognitiveservices.azure.com/";
const apiKey = "59ea1d402c8c4143be331b3783d7dafc";

const client = new FormRecognizerClient(
  endpoint,
  new AzureKeyCredential(apiKey)
);

export const analyzeForm = async (file) => {
  const poller = await client.beginRecognizeContent(file, {});

  const pages = await poller.pollUntilDone();

  return pages;
};
