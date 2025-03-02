import { Geist, Geist_Mono } from "next/font/google";

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

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isDraftModeEnabled = (await draftMode()).isEnabled;
	return (
		<html
			lang="en"
			className={cn("antialiased", geistSans.variable, geistMono.variable)}
		>
			<body>
				{children}
				{isDraftModeEnabled && <DisableDraftMode />}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
