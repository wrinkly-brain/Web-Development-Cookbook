import { codeSnippets } from "./snippets.js";

// Modal Functionality

const modal = document.getElementById('codeModal');

if (modal) {
    modal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const snippetKey = button.getAttribute('data-snippet-key');
        const codeContent = codeSnippets[snippetKey];
        if (codeContent) {
            document.getElementById('modalCode').textContent = codeContent;
        } else {
            document.getElementById('modalCode').textContent = 'Code snippet not found.';
        }
    });
}

document.getElementById('copyCodeBtn').onclick = function () {
    const code = document.getElementById('modalCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        document.getElementById('copyFeedback').style.display = 'inline';
        setTimeout(() => document.getElementById('copyFeedback').style.display = 'none', 1500);
    });
}
