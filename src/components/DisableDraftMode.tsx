"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { ActionButton } from "./ActionButton";

export function DisableDraftMode() {
	const environment = useDraftModeEnvironment();

	// Only show the disable draft mode button when outside of Presentation Tool
	if (environment !== "live" && environment !== "unknown") {
		return null;
	}

	return (
		<ActionButton
			name="Disable Draft Mode"
			href="/api/draft-mode/disable"
			className="fixed right-4 bottom-4"
			primary
		/>
	);
}
