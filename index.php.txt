<?php
$response = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];

    $errors = [];

    
    if (!preg_match("/^[a-zA-Z\s]+$/", $name)) {
        $errors['name'] = 'Name must contain only letters and spaces';
    } elseif (strlen($name) < 3) {
        $errors['name'] = 'Name must be at least 3 characters long';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }

    if ($age < 18 || $age > 100) {
        $errors['age'] = 'Age must be between 18 and 100';
    }

    if (empty($gender)) {
        $errors['gender'] = 'Please select a gender';
    }

    if (empty($errors)) {
        
        $response['success'] = true;
        $response['message'] = 'Form submitted successfully!';
    } else {
    
        $response['success'] = false;
        $response['errors'] = $errors;
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Validation/Ajax</title>
    <link rel="stylesheet" href="Styles.css"> 
</head>
<body>
    <div class="form-container">
        <img src="logo.jpg" alt="Logo" class="form-logo"> 
        <form id="ajax-form">
            <h2>Form Validation/Ajax</h2>
            
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <span id="name-error" class="error"></span>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <span id="email-error" class="error"></span>

            <label for="age">Age:</label>
            <input type="number" id="age" name="age" required>
            <span id="age-error" class="error"></span>

            <label for="gender">Gender:</label>
            <select id="gender" name="gender" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <span id="gender-error" class="error"></span>

            <button type="submit">Submit</button>
            <div id="form-output"></div>
        </form>
    </div>

    <script src="Script.js"></script> 
</body>
</html>
