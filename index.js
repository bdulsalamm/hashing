function sha256(input) {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(input);
    const buffer = new Uint8Array(data);
    const hashBuffer = new Uint8Array(32); // SHA-256 produces a 256-bit (32-byte) hash

    const sha256Constants = new Uint32Array([
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ]);

    // SHA-256 functions
    function rotr(x, n) {
        return (x >>> n) | (x << (32 - n));
    }

    function ch(x, y, z) {
        return (x & y) ^ (~x & z);
    }

    function maj(x, y, z) {
        return (x & y) ^ (x & z) ^ (y & z);
    }

    function sigma0(x) {
        return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
    }

    function sigma1(x) {
        return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
    }

    function gamma0(x) {
        return rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
    }

    function gamma1(x) {
        return rotr(x, 17) ^ rotr(x, 19) ^ (x >>> 10);
    }

    // Initialize hash values
    let [a, b, c, d, e, f, g, h] = sha256Constants;

    for (let i = 0; i < buffer.length; i += 64) {
        const chunk = new Uint32Array(16);

        for (let j = 0; j < 16; j++) {
            chunk[j] = (buffer[i + j * 4] << 24) |
                        (buffer[i + j * 4 + 1] << 16) |
                        (buffer[i + j * 4 + 2] << 8) |
                        (buffer[i + j * 4 + 3]);
        }

        // Main loop
        for (let j = 16; j < 64; j++) {
            const s0 = gamma0(chunk[j - 15]);
            const s1 = gamma1(chunk[j - 2]);
            chunk[j] = chunk[j - 16] + s0 + chunk[j - 7] + s1;
        }

        let temp1, temp2;
        for (let j = 0; j < 64; j++) {
            temp1 = h + sigma1(e) + ch(e, f, g) + sha256Constants[j] + chunk[j];
            temp2 = sigma0(a) + maj(a, b, c);
            h = g;
            g = f;
            f = e;
            e = (d + temp1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) >>> 0;
        }

        // Update hash values
        a = (a + sha256Constants[0]) >>> 0;
        b = (b + sha256Constants[1]) >>> 0;
        c = (c + sha256Constants[2]) >>> 0;
        d = (d + sha256Constants[3]) >>> 0;
        e = (e + sha256Constants[4]) >>> 0;
        f = (f + sha256Constants[5]) >>> 0;
        g = (g + sha256Constants[6]) >>> 0;
        h = (h + sha256Constants[7]) >>> 0;
    }

    const hashArray = new Uint8Array(32);
    hashArray.set(new Uint8Array(new Uint32Array([a, b, c, d, e, f, g, h]).buffer), 0);

    return Array.from(hashArray, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashText() {
    const inputText = document.getElementById('inputText').value;
    const hashedText = sha256(inputText);
    document.getElementById('hashedText').value = hashedText;
}
