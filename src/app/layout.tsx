import { Inter } from "next/font/google";

/* -----------------Styles--------------- */
import "@/styles/globals.css";

/* -----------------Utils--------------- */
import { cn } from "@/lib/utils";

/* -----------------Analytics--------------- */
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* -----------------Draft Mode--------------- */
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { draftMode } from "next/headers";

const inter = Inter({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isDraftModeEnabled = (await draftMode()).isEnabled;

	return (
		<html lang="en" className={cn("antialiased", inter.className)}>
			<body>
				{children}
				{isDraftModeEnabled && <DisableDraftMode />}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
