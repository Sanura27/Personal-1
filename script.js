const nameInput = document.getElementById('name-input');
const ideaInput = document.getElementById('idea-input');
const addBtn = document.getElementById('add-btn');
const board = document.getElementById('board');
const stats = document.getElementById('stats');

let ideas = JSON.parse(localStorage.getItem('rounded-ideas')) || [];

function saveAndRender() {
    localStorage.setItem('rounded-ideas', JSON.stringify(ideas));
    render();
}

function render() {
    board.innerHTML = '';
    ideas.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="author-name">${escapeHtml(item.name || 'Anonymous')}</span>
                <button class="delete-btn" onclick="deleteItem(${index})" title="Delete item">&times;</button>
            </div>
            <div class="idea-text">${escapeHtml(item.text)}</div>
            <div class="card-footer">${item.date}</div>
        `;
        board.appendChild(card);
    });
    stats.textContent = `${ideas.length} ${ideas.length === 1 ? 'Item' : 'Items'}`;
}

function addItem() {
    const name = nameInput.value.trim();
    const text = ideaInput.value.trim();
    
    if (text) {
        const newItem = {
            name: name,
            text: text,
            date: new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };
        ideas.unshift(newItem);
        ideaInput.value = '';
        nameInput.value = '';
        saveAndRender();
    }
}

function deleteItem(index) {
    const card = board.children[index];
    if (card) {
        card.style.transform = 'scale(0.8) translateY(20px)';
        card.style.opacity = '0';
    }
    
    setTimeout(() => {
        ideas.splice(index, 1);
        saveAndRender();
    }, 300);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

addBtn.addEventListener('click', addItem);
[nameInput, ideaInput].forEach(el => {
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItem();
    });
});

// Initial render
render();
