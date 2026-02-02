<?php
header("Content-Type: text/plain; charset=UTF-8");

// User message
$message = $_POST['message'] ?? '';

// Validation
if (trim($message) === '') {
    echo "Please ask a farming related question.";
    exit;
}

// Get API key from php.ini
$API_KEY = getenv("OPENAI_API_KEY");

if (!$API_KEY) {
    echo "API key not configured on server.";
    exit;
}

// OpenAI request payload
$data = [
    "model" => "gpt-4o-mini",
    "messages" => [
        [
            "role" => "system",
            "content" => "You are an AI assistant for farmers. Give short, simple and practical farming advice."
        ],
        [
            "role" => "user",
            "content" => $message
        ]
    ],
    "temperature" => 0.5
];

// cURL request
$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer $API_KEY"
    ],
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);

// Error handling
if (curl_errno($ch)) {
    echo "Server error. Please try again later.";
    curl_close($ch);
    exit;
}

curl_close($ch);

// Decode response
$result = json_decode($response, true);

// Output AI response
echo $result['choices'][0]['message']['content'] ?? "No response received.";
