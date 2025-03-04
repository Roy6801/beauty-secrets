/* -----------------Sanity--------------- */
import { getEnv } from "@/helpers";
import { SanityLive } from "@/sanity/lib/live";

/* -----------------Globals--------------- */
import { VercelToolbar } from "@vercel/toolbar/next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

export default async function BusinessLayerLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isDraftModeEnabled = (await draftMode()).isEnabled;
	const { isDev: shouldInjectToolbar } = getEnv();

	return (
		<>
			{shouldInjectToolbar && <VercelToolbar />}
			<SanityLive />
			{children}
			{isDraftModeEnabled && <VisualEditing />}
		</>
	);
}
