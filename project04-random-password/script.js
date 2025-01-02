// DOM elements
const passwordField = document.getElementById('password');
const lengthField = document.getElementById('length');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

// Password character pool
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';

/**
 * Generate a random password
 * @param {number} length
 * @returns {string} password
 */
function generatePassword(length) {
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// Generate password button click
generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthField.value);
  if (length < 4 || length > 20) {
    alert('Password length must be between 4 and 20!');
    return;
  }
  const password = generatePassword(length);
  passwordField.value = password;
});

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
  if (!passwordField.value) {
    alert('No password to copy!');
    return;
  }
  navigator.clipboard.writeText(passwordField.value).then(() => {
    alert('Password copied to clipboard!');
  });
});
