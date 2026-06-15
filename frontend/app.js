const API = "/tasks";

async function loadTasks() {

    const res = await fetch(API, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });

    const tasks = await res.json();

    const list = document.getElementById('list');
    list.innerHTML = '';

    tasks.forEach(task => {

        const li = document.createElement('li');

        li.innerHTML = `
            ${task.title}
            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        list.appendChild(li);

    });

}

async function addTask() {

    const title =
        document.getElementById('task').value;

    await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                localStorage.getItem('token')
        },
        body: JSON.stringify({
            title
        })
    });

    document.getElementById('task').value = '';

    loadTasks();
}

async function deleteTask(id) {

    await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization:
                localStorage.getItem('token')
        }
    });

    loadTasks();
}

loadTasks();
