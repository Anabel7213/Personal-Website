//TOGGLING THE EDITING GUIDE VISIBILITY//
const openGuide = document.querySelector(".open-guide");
const closeGuide = document.querySelector(".close-guide");
const guideContainer = document.querySelector(".guide-container")
const dynamicContainer = document.getElementById("dynamic-container")

openGuide.addEventListener("click", function() {
    guideContainer.classList.add("d-flex");
    dynamicContainer.classList.add("custom-container");
    dynamicContainer.classList.remove("container");
});

closeGuide.addEventListener("click", function() {
    guideContainer.classList.remove("d-flex");
    dynamicContainer.classList.add("container");
    dynamicContainer.classList.remove("custom-container");
});


//TOGGLING THE EDITOR GUIDE VISIBILITY//

//AUTO ADJUSTING HEIGHT OF THE TEXTAREA
function heightAutoAdjust() {
    const textarea = document.querySelector("#auto-adjust");
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
//AUTO ADJUSTING HEIGHT OF THE TEXTAREA

document.getElementById('compose-form').addEventListener('submit', function (e) {
    const bodyTextarea = document.querySelector('textarea[name="body"]');
    const bodyContent = bodyTextarea.value;
    const bodyWithHeaders = parseHeaders(bodyContent);
    bodyTextarea.value = bodyWithHeaders;
});

function parseHeaders(body) {
    const lines = body.split('\n');
    let result = '';
    let inCodeBlock = false;
    let inOrderedList = false; // Variable to track if we are inside an ordered list
    let orderedListStarted = false; // Variable to track if the ordered list has started

    for (const line of lines) {
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            result += line + '\n';
            continue;
        }

        if (inCodeBlock) {
            result += line + '\n';
        } else if (line.startsWith('#')) {
            const headerLevel = countHeaderLevel(line);
            const headerTag = `h${headerLevel}`;
            const headerText = line.substring(headerLevel).trim();
            result += `<${headerTag} class="h-margin">${headerText}</${headerTag}>\n`;
        } else if (line.startsWith('-')) {
            const bulletPoint = line.substring(1).trim();
            result += `<li class="bullet-point">${bulletPoint}</li>\n`;
        } else if (line.startsWith('/')) {
            const orderedList = line.substring(1).trim();
            if (!inOrderedList) {
                // Start of ordered list
                result += '<ol>\n';
                inOrderedList = true;
                orderedListStarted = true;
            }
            result += `<li class="ordered-list">${orderedList}</li>\n`;
        }

        //start of the three callout types//
        else if (line.startsWith('$')) {
            let calloutType = '';
            let calloutContent = '';

            if (line.startsWith('$$$')) {
                calloutType = 'subtle-callout';
                calloutContent = line.substring(3).trim();
            } else if (line.startsWith('$$')) {
                calloutType = 'box-callout-yellow';
                calloutContent = line.substring(2).trim();
            } else {
                calloutType = 'box-callout-purple';
                calloutContent = line.substring(1).trim();
            }

            result += `<div class="${calloutType}">${calloutContent}</div>\n`;
        }
        //start of the three callout types//


        else if (line.startsWith('=')) {
            const quote = line.substring(1).trim();
            result += `<div class="quoteBlock">${quote}</div>\n`;
        }

        //HIGHLIGHTING TEXT//
        else if (line.includes('*')) {
            let updatedLine = line;
            let startIndex = updatedLine.indexOf('*');
            let endIndex = updatedLine.lastIndexOf('*');

            while (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                const highlightedText = updatedLine.substring(startIndex + 1, endIndex).trim();
                const replacement = `<span class="highlight">${highlightedText}</span>`;

                updatedLine = updatedLine.substring(0, startIndex) + replacement + updatedLine.substring(endIndex + 1);

                startIndex = updatedLine.indexOf('*');
                endIndex = updatedLine.lastIndexOf('*');
            }

            result += `<p>${updatedLine}</p>\n`;
        }

        //HIGHLIGHTING TEXT// //YAY, NOW FUNCTIONAL!//


        //UNDERSCORES//
        else if (line.includes('_')) {
            let updatedLine = line;
            let startIndex = updatedLine.indexOf('_');
            let endIndex = updatedLine.lastIndexOf('_');

            while (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                const underscoredText = updatedLine.substring(startIndex + 1, endIndex).trim();
                const replacement = `<span class="underscore">${underscoredText}</span>`;

                updatedLine = updatedLine.substring(0, startIndex) + replacement + updatedLine.substring(endIndex + 1);

                startIndex = updatedLine.indexOf('_');
                endIndex = updatedLine.lastIndexOf('_');
            }

            result += `<p class="p-margin">${updatedLine}</p>\n`;
        }

        //UNDERSCORES//

        //ADDING IMAGES//
        else if (line.startsWith('%')) {
            const imageUrl = line.substring(1).trim();
            result += `<img class="img-fluid" src="${imageUrl}">\n`;
        }
        //ADDING IMAGES// NOT WORKING//

        //ANCHOR LINK//
        else if (line.startsWith('@')) {
            const delimiterIndex = line.indexOf('>');

            if (delimiterIndex !== -1) {
                const url = line.substring(1, delimiterIndex).trim();
                const linkText = line.substring(delimiterIndex + 1).trim();
                result += `<a class="anchor-link" href="${url}">${linkText}</a>\n`;
            }
        }
        //ANCHOR LINK//
        else {
            result += `<p class="p-margin">${line}</p>\n`;
        }

        // Check if the next line is not part of the ordered list
        const nextLineIndex = lines.indexOf(line) + 1;
        const nextLine = lines[nextLineIndex];
        if ((!nextLine || !nextLine.startsWith('/')) && orderedListStarted) {
            // End of ordered list
            result += '</ol>\n';
            inOrderedList = false;
            orderedListStarted = false;
        }
    }

    return result;
}

function countHeaderLevel(line) {
    let level = 0;
    while (line.charAt(level) === '#') {
        level++;
    }
    return Math.min(level, 6); // Limit header level to h6
}
  