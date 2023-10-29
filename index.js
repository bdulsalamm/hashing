window.addEventListener('load', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('hashedText').value = '';
});

async function hashText() {
    const inputText = document.getElementById('inputText').value;
    try {
        const hashedText = await sha256(inputText);
        document.getElementById('hashedText').value = hashedText;
    } catch (error) {
        console.error('Error while hashing text:', error);
    }
}

async function sha256(input) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const buffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(buffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    } catch (error) {
        console.error('Error in sha256:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}
