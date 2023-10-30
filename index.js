import Sha256 from './sha.js';

window.addEventListener('load', function() {
    document.getElementById('inputText').value = ''; 
    document.getElementById('hashedText').value = '';
});

document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const hashedText = document.getElementById('hashedText');
    
    const hashButton = document.getElementById('hashButton');

    hashButton.addEventListener('click', function() {
        const textToHash = inputText.value;
        const hash = Sha256.hash(textToHash);
        hashedText.value = hash;
    });
});
