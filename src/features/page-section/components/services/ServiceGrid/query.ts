const responseStructure = `
  sectionId,
  title,
  highlightText,
  titleSuffix,
  description,
  items[] {
    name,
    description,
    icon,
    caption,
    action {
      name,
      href,
      variant,
      external,
      iconRight,
      iconLeft
    }
  }
`;

export default responseStructure;
