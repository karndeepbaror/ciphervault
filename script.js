let currentMode = 'encrypt';

function switchTab(mode) {
    currentMode = mode;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('inputLabel').innerText = mode === 'encrypt' ? 'Secret Message' : 'Encrypted Code';
    document.getElementById('btnText').innerText = mode === 'encrypt' ? 'Encrypt & Lock' : 'Decrypt & Reveal';
    document.getElementById('messageInput').placeholder = mode === 'encrypt' ? 'Enter private text...' : 'Paste the SV- code here...';
}

function handleProcess() {
    const input = document.getElementById('messageInput').value;
    const key = document.getElementById('secretKey').value;
    const outputField = document.getElementById('resultOutput');

    if (!input || !key) {
        alert("🔒 Security Alert: Message and Key are required!");
        return;
    }

    try {
        if (currentMode === 'encrypt') {
            const encrypted = CryptoJS.AES.encrypt(input, key).toString();
            // Premium wrapping (Secret Language Look)
            outputField.value = "PROTOCOL_v2[" + btoa(encrypted) + "]";
        } else {
            const cleanInput = input.replace("PROTOCOL_v2[", "").replace("]", "");
            const decoded = atob(cleanInput);
            const bytes = CryptoJS.AES.decrypt(decoded, key);
            const original = bytes.toString(CryptoJS.enc.Utf8);
            
            if (!original) throw new Error();
            outputField.value = original;
        }
    } catch (e) {
        alert("🚫 Access Denied: Invalid Key or Corrupted Data!");
    }
}

function generatePass() {
    const pass = Math.random().toString(36).slice(-10).toUpperCase();
    document.getElementById('secretKey').value = pass;
}

function copyText() {
    const text = document.getElementById('resultOutput');
    text.select();
    document.execCommand('copy');
    alert("Copied to Secure Clipboard!");
}

function clearAll() {
    document.getElementById('messageInput').value = "";
    document.getElementById('resultOutput').value = "";
    document.getElementById('secretKey').value = "";
}

function shareWhatsApp() {
    const text = document.getElementById('resultOutput').value;
    if(!text) return alert("Nothing to share!");
    window.open(`https://wa.me/?text=Locked Message: ${encodeURIComponent(text)}`);
}
