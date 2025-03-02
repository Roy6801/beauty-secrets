const responseStructure = `
  sectionId,
  title,
  highlightText,
  titleSuffix,
  description,
  formTitle,
  formSubmitText,
  formEndpoint,
  contactInfo[] {
    type,
    icon,
    content,
    hoursDetails
  },
  socialLinks[] {
    platform,
    icon,
    url
  },
  serviceOptions[] {
    label,
    value
  }
`;

export default responseStructure;
