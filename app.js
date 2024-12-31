document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('itemForm');
    const itemsTable = document.getElementById('itemsTable').querySelector('tbody');
    let items = [];
    let editingItemId = null;

    form.onsubmit = function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();

        if (editingItemId) {
            updateItem(editingItemId, name);
        } else {
            createItem(name);
        }
    };

    function createItem(name) {
        const id = new Date().getTime(); // Generate a unique ID
        items.push({ id, name });
        renderItems();
        form.reset();
    }

    function updateItem(id, name) {
        items = items.map(item => item.id === id ? { ...item, name } : item);
        editingItemId = null;
        renderItems();
        form.reset();
    }

    function deleteItem(id) {
        items = items.filter(item => item.id !== id);
        renderItems();
    }

    function renderItems() {
        itemsTable.innerHTML = '';
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td class="actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            row.querySelector('.edit-btn').onclick = function () {
                document.getElementById('name').value = item.name;
                editingItemId = item.id;
            };
            row.querySelector('.delete-btn').onclick = function () {
                deleteItem(item.id);
            };
            itemsTable.appendChild(row);
        });
    }
});
