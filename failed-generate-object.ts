import { generateObject, type LanguageModel } from "ai";
import {
	actionSchema,
	input,
	providerOptions,
	systemPrompt,
} from "./options";

export async function failedGenerateObject(model: LanguageModel) {
  return generateObject({
    model: model,
    providerOptions: providerOptions,
    system: systemPrompt,
    output: 'array',
    schema: actionSchema,
    prompt: input,
  });
  
}