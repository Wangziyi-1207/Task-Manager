async function login() {

    const username =
        document.getElementById('username').value;

    const password =
        document.getElementById('password').value;

    const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!res.ok) {
        const msg = await res.text();
        alert('Login failed: ' + msg);
        return;
    }

    const data = await res.json();

    localStorage.setItem('token', data.token);

    location.href = 'dashboard.html';
}
async function register() {

    const username =
        document.getElementById('username').value;

    const password =
        document.getElementById('password').value;

    const res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    alert(
        res.ok
            ? 'Register successful'
            : 'Register failed'
    );
}
