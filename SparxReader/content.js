(function () {
    const BUTTON_CONTAINER_ID = 'custom-buttons-container';
    let analyzedText = ''; // Store the full analyzed text for future questions

    // Function to create a button
    function createButton(id, text, onClick) {
        const button = document.createElement('button');
        button.id = id;
        button.innerText = text;
        button.style.margin = '5px';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.onclick = onClick;
        return button;
    }

    // Function to inject the buttons into the page
    function injectButtons() {
        let container = document.getElementById(BUTTON_CONTAINER_ID);

        // If the container doesn't exist, create it
        if (!container) {
            container = document.createElement('div');
            container.id = BUTTON_CONTAINER_ID;
            container.style.position = 'fixed';
            container.style.top = '10px'; // Changed to position at the top
            container.style.right = '10px';
            container.style.zIndex = '9999';
            container.style.backgroundColor = 'white';
            container.style.border = '1px solid black';
            container.style.padding = '10px';
            container.style.borderRadius = '5px';
            container.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
            document.body.appendChild(container);
        }

        // Clear the container to avoid duplicate buttons
        container.innerHTML = '';

        // Add the buttons
        container.appendChild(createButton('analyze-text', 'Analyze Text', analyzeText));
        container.appendChild(createButton('analyze-question', 'Analyze Question', analyzeQuestion));

        console.log('Buttons injected successfully!');
    }

    // Function to get the specific text between "Start reading here" and "Stop reading here"
    function getTextFromPage() {
        const bodyText = document.body.innerText;
        const startReading = 'Start reading here';
        const stopReading = 'Stop reading here';
        
        const startIndex = bodyText.indexOf(startReading) + startReading.length;
        const stopIndex = bodyText.indexOf(stopReading);

        if (startIndex !== -1 && stopIndex !== -1 && stopIndex > startIndex) {
            return bodyText.substring(startIndex, stopIndex).trim();
        }

        return '';
    }

    // Function to analyze the text
    function analyzeText() {
        const content = getTextFromPage();

        if (!content) {
            console.log('Text content not found.');
            return;
        }

        analyzedText = content; // Store the specific analyzed text
        console.log('Newly Analyzed Text:', analyzedText);

        // Automatically copy the analyzed text to clipboard
        copyToClipboard(analyzedText);
    }

    // Function to analyze the question and options and copy it automatically
    function analyzeQuestion() {
        if (!analyzedText) {
            console.log('No text has been analyzed yet.');
            return;
        }

        const questionElement = document.querySelector('div._PanelQuestionContent_1mh3v_240');
        const questionText = questionElement ? questionElement.innerText.trim() : '';

        if (!questionText) {
            console.log('No question content found.');
            return;
        }

        const options = [];
        const buttonElements = document.querySelectorAll('button._Button_17uc2_1.undefined');
        buttonElements.forEach(button => {
            const optionText = button.querySelector('div') ? button.querySelector('div').innerText.trim() : '';
            if (optionText) {
                options.push(optionText);
            }
        });

        if (!options.length) {
            console.log('No options found.');
            return;
        }

        // Create the question and options text
        const questionAndOptionsText = `Question: ${questionText}\nOptions:\n${options.join('\n')}`;
        console.log('Question and Options:', questionAndOptionsText);

        // Automatically copy the question and options to clipboard
        copyToClipboard(questionAndOptionsText);
    }

    // Function to copy text to the clipboard
    function copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Copied to clipboard!');
    }

    // Initialize and inject the buttons when the script runs
    injectButtons();
})();
