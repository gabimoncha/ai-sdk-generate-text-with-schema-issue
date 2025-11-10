import { type LanguageModel, Output, stepCountIs, ToolLoopAgent } from "ai";
import {
	actionSchema,
	input,
	providerOptions,
	systemPromptWithTool,
	tools,
} from "./options";


export async function failedToolLoopAgent(model: LanguageModel) {
  const assistant = new ToolLoopAgent({
    model,
    providerOptions,
    tools,
    toolChoice: {
      type: "tool",
      toolName: "resolveDate",
    },
    instructions: systemPromptWithTool,
    output: Output.array({ element: actionSchema }),
    stopWhen: stepCountIs(5),
  });

  return assistant.generate({
    prompt: input,
  });
}
