const confirmPassword = () => {
    const newPassword = document.querySelector('#new-password');
    const repeatPassword = document.querySelector('#new-password-repeat');
    const errorField = document.querySelector('#password-error-field');

    const checkPasswords = () => {
        if (repeatPassword.value === newPassword.value) {
            console.log("Identical");
            errorField.textContent = '';

        } else {
            console.log("WRONG");
            errorField.textContent = 'Passwords do not match!';
        }
    };

    newPassword.addEventListener('input', checkPasswords);
    repeatPassword.addEventListener('input', checkPasswords);
}

export {confirmPassword};
