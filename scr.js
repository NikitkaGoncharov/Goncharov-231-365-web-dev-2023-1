let perPage = 5;
let currentPage = 1;
let totalPage = 0;
const mainUrl = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/';

function renderOrders(orders) {
    const tbody = document.querySelector(".tbody");    
    tbody.innerHTML = ''; 
    for (const result of orders) {
        console.log(orders);
        const tr = document.createElement("tr"); 
        tr.id = result.id; 
        const name = document.createElement("td"); 
        name.textContent = result.name; 
        tr.append(name); 
        const description = document.createElement("td"); 
        description.textContent = result.description; 
        tr.append(description); 
        const mainObject = document.createElement("td"); 
        mainObject.textContent = result.mainObject; 
        tr.append(mainObject); 
        tbody.appendChild(tr); 
    
    }

}


function renderPagination() {
    const blockPagination = document.querySelector('.pagination');
    blockPagination.innerHTML = '';
    const totalVisiblePages = 5;

    for (let i = 1; i <= Math.min(totalPage, totalVisiblePages); i++) {
        addButton(i, blockPagination);
    }

    if (totalPage > totalVisiblePages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>';
        nextBtn.addEventListener('click', () => {
            const startPage = Math.min(totalPage - (totalVisiblePages - 1), currentPage + 1);
            renderPaginationForNextPages(startPage, startPage + (totalVisiblePages - 1), blockPagination); // Передаем blockPagination
        });
        blockPagination.append(nextBtn);
    }
    if (currentPage > 1) {
        const backBtn = document.createElement('button');
        backBtn.textContent = '< ';
        backBtn.addEventListener('click', () => {
            currentPage--;
            getOrgers();
            renderPagination();
        });
        blockPagination.prepend(backBtn);
    }
}

function renderPaginationForNextPages(startPage, endPage, blockPagination) {
    blockPagination.innerHTML = '';
    for (let i = startPage; i <= Math.min(totalPage, endPage); i++) {
        addButton(i, blockPagination);
    }
    if (endPage < totalPage) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>';
        nextBtn.addEventListener('click', () => {
            const newStartPage = endPage + 1;
            renderPaginationForNextPages(newStartPage, newStartPage + (totalVisiblePages - 1), blockPagination); // Повторно передаем blockPagination
        });
        blockPagination.append(nextBtn);
    }
}

function addButton(pageNumber, parentElement) {
    const btn = document.createElement('button');
    btn.textContent = pageNumber;
    if (currentPage === pageNumber) {
        btn.style.backgroundColor = 'red';
    }
    btn.addEventListener('click', (event)=>{
        const target = event.target;
        currentPage = parseInt(target.textContent); // Приводим к числовому типу, так как currentPage объявляется как число
        getOrgers(); // Вызываем getOrgers для загрузки данных новой страницы
    });
    parentElement.append(btn);
}

function getOrgers() {
    const url = new URL('routes', mainUrl);
    url.searchParams.set('api_key', '1ad2694f-6bd9-4ea9-a773-305f1dac2fc7');
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        totalPage = Math.ceil(data.length / perPage);
        const start = currentPage * perPage - perPage;
        const end = currentPage * perPage;
        renderOrders(data.slice(start, end));
        renderPagination();
    };

}

window.addEventListener('DOMContentLoaded', getOrgers);