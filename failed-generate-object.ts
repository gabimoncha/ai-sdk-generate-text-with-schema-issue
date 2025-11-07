import { generateObject, type LanguageModel } from "ai";
import {
	actionSchema,
	input,
	providerOptions,
  systemPromptWithTool,
} from "./options";

export async function failedGenerateObject(model: LanguageModel) {
  return generateObject({
    model: model,
    providerOptions: providerOptions,
    system: systemPromptWithTool,
    output: 'array',
    schema: actionSchema,
    prompt: input,
  });
  
}