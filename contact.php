<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $to = "juniormtshali19@gmail.com";
    $subject = "New Contact Request from Tidy Techs";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    $headers = "From: $email";

    if(mail($to, $subject, $body, $headers)){
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request.";
}
?>
