import {failedGenerateObject} from "./failed-generate-object";
import {failedGenerateText} from "./failed-generate-text";
import {failedToolLoopAgent} from "./failed-tool-loop-agent";
import {aiGatewayModel, googleModel, groqModel, openrouterProviderModel} from "./options";

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

  // This one fails to match schema
  try {
    const aiGatewayResult = await failedGenerateText(aiGatewayModel);
    console.log("AI Gateway result:")
    console.log(JSON.stringify(aiGatewayResult.content, null, 2));
    console.log("AI Gateway step count:")
    console.log(aiGatewayResult.steps.length);
  } catch (error) {
    console.error("AI Gateway failed:", error);
  }

  // generateObject
  // This one works
  try {
    const groqResult = await failedGenerateObject(groqModel);
    console.log("Groq object:")
    console.log(JSON.stringify(groqResult.object, null, 2));
  } catch (error) {
    console.error("groq failed:\n", error);
  }

  // This one works
  try {
    const googleResult = await failedGenerateObject(googleModel);
    console.log("Google object:")
    console.log(JSON.stringify(googleResult.object, null, 2));
  } catch (error) {
    console.error("Google failed:\n", error);
  }

  // This one works
  try {
    const openrouterResult = await failedGenerateObject(openrouterProviderModel);
    console.log("Openrouter object:")
    console.log(JSON.stringify(openrouterResult.object, null, 2));
  } catch (error) {
    console.error("Openrouter failed:", error);
  }

  // This one fails to match schema
  try {
    const aiGatewayResult = await failedGenerateObject(aiGatewayModel);
    console.log("AI Gateway object:")
    console.log(JSON.stringify(aiGatewayResult.object, null, 2));
  } catch (error) {
    console.error("AI Gateway failed:", error);
  }

  // generateObject
  // This one fails
  try {
    const groqResult = await failedToolLoopAgent(groqModel);
    console.log("Groq output:")
    console.log(JSON.stringify(groqResult.output, null, 2));
    console.log("Groq step count:")
    console.log(groqResult.steps.length);
  } catch (error) {
    console.error("groq failed:\n", error);
  }

  // This one fails
  try {
    const googleResult = await failedToolLoopAgent(googleModel);
    console.log("Google output:")
    console.log(JSON.stringify(googleResult.output, null, 2));
    console.log("Google step count:")
    console.log(googleResult.steps.length);
  } catch (error) {
    console.error("Google failed:\n", error);
  }

  // This one stops after the tool call
  try {
    const openrouterResult = await failedToolLoopAgent(openrouterProviderModel);
    console.log("Openrouter output:")
    console.log(JSON.stringify(openrouterResult.output, null, 2));
    console.log("Openrouter step count:")
    console.log(openrouterResult.steps.length);
  } catch (error) {
    console.error("Openrouter failed:", error);
  }

  // This one fails to match schema
  try {
    const aiGatewayResult = await failedToolLoopAgent(aiGatewayModel);
    console.log("AI Gateway output:")
    console.log(JSON.stringify(aiGatewayResult.output, null, 2));
    console.log("AI Gateway step count:")
    console.log(aiGatewayResult.steps.length);
  } catch (error) {
    console.error("AI Gateway failed:", error);
  }
}

main().catch(console.error);