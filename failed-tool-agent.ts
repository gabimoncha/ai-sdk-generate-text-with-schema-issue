import { Experimental_Agent as Agent, type LanguageModel, Output, stepCountIs } from "ai";
import z from "zod";
import {
	actionSchema,
	input,
	providerOptions,
	systemPromptWithTool,
	tools,
} from "./options";


export async function failedToolAgent(model: LanguageModel) {
  const dateAgent = new Agent({
    model,
    system: systemPromptWithTool,
    tools,
    experimental_output: Output.object({
			schema: z.array(actionSchema),
		}),
    stopWhen: stepCountIs(20),
  });

	return dateAgent.generate({
		providerOptions,
		prompt: input,
	});
}
