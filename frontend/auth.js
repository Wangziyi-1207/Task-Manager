async function register() {

    const res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });

    if (res.ok) {
        alert('Register successful');
    } else {
        alert('Register failed');
    }
}

async function login() {

    const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });

    if (!res.ok) {
        alert('Username or password incorrect');
        return;
    }

    const data = await res.json();

    localStorage.setItem(
        'token',
        data.token
    );

    location.href = 'dashboard.html';
}
