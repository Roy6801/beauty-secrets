const responseStructure = `
  sectionId,
  title,
  highlightText,
  titleSuffix,
  description,
  testimonials[] {
    name,
    service,
    comment,
    rating,
    "avatarUrl": avatar.asset->url
  }
`;

export default responseStructure;
