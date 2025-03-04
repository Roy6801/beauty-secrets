/* -----------------Components--------------- */
import AdaptiveText from "./AdaptiveText";
import Label from "./Label";
import MDX from "./MDX";
import MDXClient from "./MDXClient";
import PortableText from "./PortableText";
import Title from "./Title";

/* -----------------Types--------------- */
import type { AdaptiveTextContent } from "./AdaptiveText";
import type { MDXProps } from "./MDX";
import type { PortableContent } from "./PortableText";
import type { TitleProps } from "./Title";

export const Content = {
	Label,
	Title,
	PortableText,
	AdaptiveText,
	MDX,
	MDXClient,
};

export type { TitleProps, PortableContent, AdaptiveTextContent, MDXProps };
