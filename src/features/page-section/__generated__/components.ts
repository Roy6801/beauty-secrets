// This file is auto-generated. Do not edit directly.

import { default as ImageWithContent } from "../components/about/ImageWithContent/ImageWithContent";
import { default as ContactWithForm } from "../components/contact/ContactWithForm/ContactWithForm";
import { default as ImageGallery } from "../components/gallery/ImageGallery/ImageGallery";
import { default as LeftCenterWithBackgroundImage } from "../components/hero/LeftCenterWithBackgroundImage/LeftCenterWithBackgroundImage";
import { default as ServiceGrid } from "../components/services/ServiceGrid/ServiceGrid";
import { default as TestimonialCards } from "../components/testimonials/TestimonialCards/TestimonialCards";

export const components = {
	contact: [{ name: "ContactWithForm", component: ContactWithForm }],
	testimonials: [{ name: "TestimonialCards", component: TestimonialCards }],
	gallery: [{ name: "ImageGallery", component: ImageGallery }],
	about: [{ name: "ImageWithContent", component: ImageWithContent }],
	hero: [
		{
			name: "LeftCenterWithBackgroundImage",
			component: LeftCenterWithBackgroundImage,
		},
	],
	services: [{ name: "ServiceGrid", component: ServiceGrid }],
} as const;
