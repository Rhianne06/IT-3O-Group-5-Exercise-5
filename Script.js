document.getElementById('ajax-form').addEventListener('submit', function(e) {
    e.preventDefault();

    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('age-error').textContent = '';
    document.getElementById('gender-error').textContent = '';
    document.getElementById('form-output').textContent = '';

    let nameError = '';
    let emailError = '';
    let ageError = '';
    let genderError = '';

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError = 'Invalid email format';
    }

    
    if (!name.match(/^[a-zA-Z\s]+$/)) {
        nameError = 'Name must contain only letters and spaces';
    } else if (name.length < 3) {
        nameError = 'Name must be at least 3 characters long';
    }

    if (age < 18 || age > 100) {
        ageError = 'Age must be between 18 and 100';
    }

    if (gender === '') {
        genderError = 'Please select a gender';
    }

    
    document.getElementById('name-error').textContent = nameError;
    document.getElementById('email-error').textContent = emailError;
    document.getElementById('age-error').textContent = ageError;
    document.getElementById('gender-error').textContent = genderError;

    
    if (!nameError && !emailError && !ageError && !genderError) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '', true); 
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (xhr.status === 200) {
                
                const response = JSON.parse(xhr.responseText);
                
                if (response.success) {
                    document.getElementById('form-output').textContent = response.message;
                } else {
                    
                    if (response.errors.name) {
                        document.getElementById('name-error').textContent = response.errors.name;
                    }
                    if (response.errors.email) {
                        document.getElementById('email-error').textContent = response.errors.email;
                    }
                    if (response.errors.age) {
                        document.getElementById('age-error').textContent = response.errors.age;
                    }
                    if (response.errors.gender) {
                        document.getElementById('gender-error').textContent = response.errors.gender;
                    }
                }
            } else {
                document.getElementById('form-output').textContent = 'Error occurred. Please try again.';
            }
        };

        xhr.send(`name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&age=${encodeURIComponent(age)}&gender=${encodeURIComponent(gender)}`);
    }
});
