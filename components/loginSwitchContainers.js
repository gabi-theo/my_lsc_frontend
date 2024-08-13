const switchLoginToRegister = () => {
    const loginContainer = document.querySelector('.login-screen');
    const registerContainer = document.querySelector('.register-screen');
    const noAccountButton = document.querySelector('.no-account-button');
    const registerButton = document.querySelector('.submit-register-button');
    const cancelButton = document.querySelector('.cancel-register-button');

    // Switch from login to register
    noAccountButton.addEventListener('click', () => {
        if (registerContainer.classList.contains('hidden')) {
            loginContainer.classList.add('hidden');
            registerContainer.classList.remove('hidden');
        }
    });

    // Switch from register to login after successful registration
    registerButton.addEventListener('click', () => {
        if (loginContainer.classList.contains('hidden')) {
            loginContainer.classList.remove('hidden');
            registerContainer.classList.add('hidden');
        }

    });

    // Switch from register to login when canceling registration
    cancelButton.addEventListener('click', () => {
        if (loginContainer.classList.contains('hidden')) {
            loginContainer.classList.remove('hidden');
            registerContainer.classList.add('hidden');
        }
    });
}

export { switchLoginToRegister };
