const API = "http://localhost:3000/tasks";

async function loadTasks() {
    const res = await fetch(API, {
        headers: { 'Authorization': localStorage.getItem('token') }
    });
    const tasks = await res.json();

    const list = document.getElementById('list');
    list.innerHTML = '';
    tasks.forEach(t => {
        const li = document.createElement('li');
        li.innerText = t.title;
        list.appendChild(li);
    });
}
async function addTask() {
    await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ title: task.value })
    });
    loadTasks();
}

loadTasks();
