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
    variant,
    external,
    iconLeft,
    iconRight
  }
`;

export default responseStructure;
