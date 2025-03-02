const responseStructure = `
  sectionId,
  title,
  highlightText,
  titleSuffix,
  description,
  imagePosition,
  image {
    "src": asset->url,
    alt
  },
  actions[] {
    name,
    href,
    primary,
    external,
    iconLeft,
    iconRight
  }
`;

export default responseStructure;
