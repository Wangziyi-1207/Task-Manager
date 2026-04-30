async function login() {
    const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });
    const data = await res.json();
    localStorage.setItem('token', data.token);
    location.href = 'dashboard.html';
}
