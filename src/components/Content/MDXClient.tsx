"use client";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
/* -----------------Types--------------- */
import type { MDXProps } from "./MDX";

import { toast } from "sonner";

/* -----------------Constants--------------- */
import { MDX_PROCESSING_ENDPOINT } from "@/constants";

const MDXClient = ({
	textContent,
	apiToken,
	className,
}: MDXProps & { apiToken: string }) => {
	const [contentHTML, setContentHTML] = useState<string | null>(null);

	useEffect(() => {
		const evaluateMDX = async () => {
			if (textContent) {
				const response = await fetch(MDX_PROCESSING_ENDPOINT, {
					headers: {
						Authorization: `Bearer ${apiToken}`,
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({ mdx: textContent }),
				});

				if (!response.ok) {
					const { error } = await response.json();

					toast.error("Failed to process MDX content", {
						description: error || "Please try again",
					});

					return;
				}

				const { compiled } = await response.json();

				setContentHTML(compiled);
			}
		};

		evaluateMDX();
	}, [textContent, apiToken]);

	if (!contentHTML) {
		return textContent;
	}

	return (
		<div
			className={cn("prose lg:prose-lg text-foreground", className)}
			dangerouslySetInnerHTML={{ __html: contentHTML }}
		/>
	);
};

export default MDXClient;
