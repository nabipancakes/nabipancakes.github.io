<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // Checks if the email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    // Email settings
    $to = "info.thebookdiaries@gmail.com"; 
    $subject = "New Message from " . $name;
    $body = "You have received a new message from $name ($email):\n\n$message";
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to a thank you page after successful form submission
        header("Location: thank_you.html");  
        exit();
    } else {
        // In case of an error, redirect to an error page or show an error message
        header("Location: error_page.html");  
        exit();
    }
}
?>
