import React from 'react'

const TextFormator = ({text}) => {

    const formatText = (inputText) => {
        // Split the text by `. ` or `:` while preserving meaningful sections
        const sections = inputText.split(/(?<=[.:])\s+/);
    
        const formattedSections = sections.map((section) => {
          // Check if the section appears to be a title or heading
          if (section.includes(":") && !section.startsWith("http")) {
            const [title, ...descriptionParts] = section.split(":");
            return `<strong>${title.trim()}:</strong> ${descriptionParts
              .join(":")
              .trim()}`;
          }
          return section.trim();
        });
    
        return formattedSections.join("\n\n"); // Add spacing between sections
      };

      const splitText = formatText(text);


  return (
    <>
    
    {splitText.split("\n\n").map((section, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: section }} />
      ))}
    </>
  )
}

export default TextFormator
