// This function formats the given text based on certain formatting markers
const formatText = (text) => {
    let formattedText;

    // Check if the text contains bullet points (•)
    if (text.includes("•")) {
        // Split the text at each newline character followed by a bullet point (•)
        let formattedTextHasListStyle = text.split("\n•");
        formattedText = formattedTextHasListStyle;
        return formattedText;
    }

    // Check if the text contains dashes (-)
    if (text.includes("-")) {
        // Split the text at each newline character
        let formattedTextHasDash = text.split("\n");
        formattedText = formattedTextHasDash;
        return formattedText;
    }

    return formattedText;
};

export default formatText;
