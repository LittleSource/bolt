import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";
export interface Article extends MarkdownParsedContent {
	author: string;
	date: string;
}
