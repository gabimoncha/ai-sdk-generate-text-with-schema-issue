import { generateText, type LanguageModel, Output, stepCountIs } from "ai";
import {
	actionSchema,
	input,
	providerOptions,
	systemPromptWithTool,
	tools,
} from "./options";

export async function failedGenerateText(model: LanguageModel) {
	return generateText({
		model: model,
		providerOptions,
		prompt: input,
		tools,
		system: systemPromptWithTool,
    output: Output.array({ element: actionSchema }),
		stopWhen: stepCountIs(5),
	});
}
