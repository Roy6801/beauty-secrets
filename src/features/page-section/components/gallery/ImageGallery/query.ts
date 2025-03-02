const responseStructure = `
  sectionId,
  title,
  highlightText,
  titleSuffix,
  description,
  columns,
  viewMoreLink,
  viewMoreText,
  images[] {
    "src": asset->url,
    alt,
    title
  }
`;

export default responseStructure;
