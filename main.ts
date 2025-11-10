import {failedGenerateObject} from "./failed-generate-object";
import {failedGenerateText} from "./failed-generate-text";
import {failedToolAgent} from "./failed-tool-agent";
import {googleModel, groqModel, openrouterProviderModel} from "./options";

async function main() {
  // generateText with experimental_output
  // This one fails
  try {
    const googleResult = await failedGenerateText(googleModel);
    console.log("Google result:")
    console.log(JSON.stringify(googleResult.content, null, 2));
    console.log("Google step count:")
    console.log(googleResult.steps.length);
  } catch (error) {
    console.error("Google failed:\n", error);
  }
  
  // This one fails
  try {
    const groqResult = await failedGenerateText(groqModel);
    console.log("Groq result:")
    console.log(JSON.stringify(groqResult.content, null, 2));
    console.log("Groq step count:")
    console.log(groqResult.steps.length);
  } catch (error) {
    console.error("groq failed:\n", error);
  }

  // This one works, but still returns text instead of object
  try {
    const openrouterResult = await failedGenerateText(openrouterProviderModel);
    console.log("Openrouter result:")
    console.log(JSON.stringify(openrouterResult.content, null, 2));
    console.log("Openrouter step count:")
    console.log(openrouterResult.steps.length);
  } catch (error) {
    console.error("Openrouter failed:", error);
  }

  // generateObject
  // This one works
  try {
    const groqResult = await failedGenerateObject(groqModel);
    console.log("Groq result:")
    console.log(JSON.stringify(groqResult.object, null, 2));
  } catch (error) {
    console.error("groq failed:\n", error);
  }

  // This one works
  try {
    const googleResult = await failedGenerateObject(googleModel);
    console.log("Google result:")
    console.log(JSON.stringify(googleResult.object, null, 2));
  } catch (error) {
    console.error("Google failed:\n", error);
  }

  // This one works
  try {
    const openrouterResult = await failedGenerateObject(openrouterProviderModel);
    console.log("Openrouter result:")
    console.log(JSON.stringify(openrouterResult.object, null, 2));
  } catch (error) {
    console.error("Openrouter failed:", error);
  }

  // tool agent
  // This one fails
  try {
    const groqResult = await failedToolAgent(groqModel);
    console.log("Groq result:")
    console.log(JSON.stringify(groqResult.experimental_output, null, 2));
  } catch (error) {
    console.error("groq failed:\n", error);
  }

  // This one fails
  try {
    const googleResult = await failedToolAgent(googleModel);
    console.log("Google result:")
    console.log(JSON.stringify(googleResult.experimental_output, null, 2));
  } catch (error) {
    console.error("Google failed:\n", error);
  }

  // This one works
  try {
    const openrouterResult = await failedToolAgent(openrouterProviderModel);
    console.log("Openrouter result:")
    console.log(JSON.stringify(openrouterResult.experimental_output, null, 2));
  } catch (error) {
    console.error("Openrouter failed:", error);
  }
}

main().catch(console.error);