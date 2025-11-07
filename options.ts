import type {GatewayProviderOptions} from "@ai-sdk/gateway";
import { type GoogleGenerativeAIProviderOptions, google } from "@ai-sdk/google";
import { type GroqProviderOptions, groq } from "@ai-sdk/groq";
import {
	type OpenRouterProviderOptions,
	openrouter,
} from "@openrouter/ai-sdk-provider";
import { gateway, type LanguageModel, type ToolSet, tool } from "ai";
import { en } from "chrono-node";
import dayjs from "dayjs";
import z from "zod";

export const input =
	"Tomorrow I need prepare the reproducing repo for the AI SDK bug and then link it to the issue";

export const systemPrompt = `
You are a helpful assistant that can help with tasks.

Today is ${dayjs().format("YYYY-MM-DD")}

Your goal is to create the user's schedule based on the input.
If more than one action is mentioned, split it into multiple tasks.
Follow the JSON schema provided.
`;


export const systemPromptWithTool = `
You are a helpful assistant that can help with tasks.

Today is ${dayjs().format("YYYY-MM-DD")}

You have access to resolveDate tool to convert natural language date expressions from the input into ISO date strings.

Your task is to create the user's schedule based on the input and the ISO dates.
If more than one action is mentioned, split it into multiple tasks.
Follow the JSON schema provided.
`;


export const googleModel: LanguageModel = google("gemini-2.5-flash-lite");
export const groqModel: LanguageModel = groq("openai/gpt-oss-120b");
export const openrouterProviderModel: LanguageModel = openrouter("openai/gpt-oss-120b");
export const aiGatewayModel: LanguageModel = gateway("openai/gpt-oss-120b");

export const providerOptions = {
  google: {
    thinkingConfig: { thinkingBudget: 8192, includeThoughts: true },
  } satisfies GoogleGenerativeAIProviderOptions,
  gateway: {
    order: ["groq", "fireworks", "bedrock"],
    only: ["groq", "fireworks", "bedrock"],
  } satisfies GatewayProviderOptions,
	groq: {
		reasoningEffort: "medium",
	} satisfies GroqProviderOptions,
	openrouter: {
		reasoning: {
			effort: "medium",
		},
	} satisfies OpenRouterProviderOptions,
};

export const actionSchema = z.object({
	name: z.string().describe("Concise action name"),
	date: z
		.string()
		.nullable()
		.describe(
			"ISO 8601 format (YYYY-MM-DD). Use when date is mentioned, for repeating actions, or in chronological order.",
		),
});

export const resolveDateSchema = z.object({
	text: z.string().describe("The input expression that is parsed"),
	start: z.string().describe("The formatted date"),
});

const resolveDate = ({ input }: { input: string }) => {
	const reference = dayjs().toDate();
	const parsed = en.parse(input, reference, {
		forwardDate: true,
	});
	if (!parsed || parsed.length === 0) return null;
	return parsed.map((p) => ({
		text: p.text,
		start: dayjs(p.start.date()).format("YYYY-MM-DD"),
	}));
};

export const tools = {
	resolveDate: tool({
		name: "resolveDate",
		description:
			"Convert natural language date expressions into ISO date strings.",
		inputSchema: z.object({
			input: z
				.string()
				.describe('Natural language date expression, e.g. "Tuesday next week"'),
		}),
		execute: resolveDate,
	}),
} satisfies ToolSet;

