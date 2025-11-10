import {failedGenerateObject} from "./failed-generate-object";
import {failedGenerateText} from "./failed-generate-text";
import {failedToolLoopAgent} from "./failed-tool-loop-agent";
import {aiGatewayModel, googleModel, groqModel, openrouterProviderModel} from "./options";

async function main() {
  // generateText with structured output
  // This one fails - Function calling with a response mime type: 'application/json' is unsupported
  try {
    const googleResult = await failedGenerateText(googleModel);
    console.log("generateText - Google result:")
    console.log(JSON.stringify(googleResult.content, null, 2));
    console.log("generateText - Google step count:")
    console.log(googleResult.steps.length);
  } catch (error) {
    console.error("generateText - Google failed:\n", error);
  }
  
  // This one fails - json mode cannot be combined with tool/function calling
  try {
    const groqResult = await failedGenerateText(groqModel);
    console.log("generateText - Groq result:")
    console.log(JSON.stringify(groqResult.content, null, 2));
    console.log("generateText - Groq step count:")
    console.log(groqResult.steps.length);
  } catch (error) {
    console.error("generateText - Groq failed:\n", error);
  }

  // This one fails, doesn't call tool
  try {
    const openrouterResult = await failedGenerateText(openrouterProviderModel);
    console.log("generateText - Openrouter result:")
    console.log(JSON.stringify(openrouterResult.content, null, 2));
    console.log(JSON.stringify(openrouterResult, null, 2));
    console.log("generateText - Openrouter step count:")
    console.log(openrouterResult.steps.length);
  } catch (error) {
    console.error("generateText - Openrouter failed:", error);
  }

  // This one fails, No object generated: response did not match schema.
  try {
    const gatewayResult = await failedGenerateText(aiGatewayModel);
    console.log("generateText - AI Gateway result:")
    console.log(JSON.stringify(gatewayResult.content, null, 2));
    console.log("generateText - AI Gateway step count:")
    console.log(gatewayResult.steps.length);
  } catch (error) {
    console.error("generateText - AI Gateway failed:", error);
  }

  // generateObject
  // This one works
  try {
    const groqResult = await failedGenerateObject(groqModel);
    console.log("generateObject - Groq result:")
    console.log(JSON.stringify(groqResult.object, null, 2));
  } catch (error) {
    console.error("generateObject - Groq failed:\n", error);
  }

  // This one works
  try {
    const googleResult = await failedGenerateObject(googleModel);
    console.log("generateObject - Google result:")
    console.log(JSON.stringify(googleResult.object, null, 2));
  } catch (error) {
    console.error("generateObject - Google failed:\n", error);
  }

  // This one works
  try {
    const openrouterResult = await failedGenerateObject(openrouterProviderModel);
    console.log("generateObject - Openrouter result:")
    console.log(JSON.stringify(openrouterResult.object, null, 2));
  } catch (error) {
    console.error("generateObject - Openrouter failed:", error);
  }

  // This one works
  try {
    const gatewayResult = await failedGenerateObject(aiGatewayModel);
    console.log("generateObject - AI Gateway result:")
    console.log(JSON.stringify(gatewayResult.object, null, 2));
  } catch (error) {
    console.error("generateObject - AI Gateway failed:", error);
  }

  // tool loop agent
  // This one fails - json mode cannot be combined with tool/function calling
  try {
    const groqResult = await failedToolLoopAgent(groqModel);
    console.log("toolLoopAgent - Groq result:")
    console.log(JSON.stringify(groqResult.output, null, 2));
  } catch (error) {
    console.error("toolLoopAgent - Groq failed:\n", error);
  }

  // This one fails - Function calling with a response mime type: 'application/json' is unsupported
  try {
    const googleResult = await failedToolLoopAgent(googleModel);
    console.log("toolLoopAgent - Google result:")
    console.log(JSON.stringify(googleResult.output, null, 2));
  } catch (error) {
    console.error("toolLoopAgent - Google failed:\n", error);
  }

  // This one fails, doesn't call tool
  try {
    const openrouterResult = await failedToolLoopAgent(openrouterProviderModel);
    console.log("toolLoopAgent - Openrouter result:")
    console.log(JSON.stringify(openrouterResult.output, null, 2));
    console.log(JSON.stringify(openrouterResult, null, 2));
  } catch (error) {
    console.error("toolLoopAgent - Openrouter failed:", error);
  }

  // This one fails - No object generated: response did not match schema.
  try {
    const gatewayResult = await failedToolLoopAgent(aiGatewayModel);
    console.log("toolLoopAgent - AI Gateway result:")
    console.log(JSON.stringify(gatewayResult.output, null, 2));
  } catch (error) {
    console.error("toolLoopAgent - AI Gateway failed:", error);
  }
}

main().catch(console.error);