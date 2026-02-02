function toggleChat() {
    let box = document.getElementById("chatbot-box");
    box.style.display = box.style.display === "none" ? "flex" : "none";
}

function sendMessage() {
    let msg = document.getElementById("userMsg").value;
    if (msg === "") return;

    let chatBody = document.getElementById("chatBody");
    chatBody.innerHTML += `<p><b>You:</b> ${msg}</p>`;

    fetch("chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "message=" + encodeURIComponent(msg)
    })
    .then(res => res.text())
    .then(reply => {
        chatBody.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
        document.getElementById("userMsg").value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
    });
}
