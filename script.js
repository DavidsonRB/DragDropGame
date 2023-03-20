
let quantidade = 5;
let acertos = 0;
let tentativas = 0;

function criarTela(itensJson, quantidade) {
    let nome = [];
    let dataNames = [];

    acertos = 0;
    tentativas = 0;

    document.querySelector(".drag-area--item").innerHTML = '';
    document.querySelector(".drop-area--item").innerHTML = '';

    cores.sort(() => Math.random() - 0.5);

    itensJson.forEach((item) => {
        nome.push(item.name);
        dataNames.push(item.dataName);
    });

    let area_drag = document.querySelector(".drag-area--item");
    let area_drop = document.querySelector(".drop-area--item");

    let posicoesSelecionadas = [];

    for (let i = 0; i < quantidade; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * nome.length);
        } while (posicoesSelecionadas.includes(randomIndex));

        posicoesSelecionadas.push(randomIndex);

        let randomName = nome[randomIndex];
        let randomDataName = dataNames[randomIndex];

        let randomColor = cores[i % cores.length];

        area_drag.innerHTML += `<i data-name="${randomName}" data-color="${randomColor}"
        class=" fa-solid fa-${randomDataName} fa-4x drag-item" draggable="true"
        style="display:flex; color: ${randomColor}; order:${(Math.random() * 20).toFixed(0)}"></i>`;

        area_drop.innerHTML += `<div data-name="${randomName}" class="drop-item"><span>${randomName}</span></div>`;
    }
}

//  BOTOES 
document.querySelector('.btn--qtmenos').addEventListener('click', () => {
    if (quantidade > 5) {
        quantidade--;
        document.querySelector('.qt').innerHTML = quantidade;
    }
});

document.querySelector('.btn--qtmais').addEventListener('click', () => {
    if (quantidade < 20) {
        quantidade++;
        document.querySelector('.qt').innerHTML = quantidade;
    }

});

// Btn-start
document.querySelector('.start').addEventListener('click', () => {
    let areaWidth = document.querySelector('.area').clientWidth;
    document.querySelector('.area').style.marginLeft = `-${areaWidth}px`;

    criarTela(itensJson, quantidade);

    document.querySelectorAll('.drag-item').forEach(drag => {
        drag.addEventListener('dragstart', dragStart);
        drag.addEventListener('dragend', dragEnd);
    });

    document.querySelectorAll('.drop-item').forEach(drop => {
        drop.addEventListener('dragover', dragOver);
        drop.addEventListener('dragleave', dragLeave);
        drop.addEventListener('drop', dropItem);
    });


    document.querySelector('.drag-area--item').addEventListener('dragover', dragOverNeutral);
    document.querySelector('.drag-area--item').addEventListener('dragleave', dragLeaveNeutral);
    document.querySelector('.drag-area--item').addEventListener('drop', dropNeutral);

});


// Functions Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Functions Area
function dragOver(e) {
    if (e.currentTarget.querySelector('.drag-item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function dropItem(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.drag-item.dragging');

    if (e.currentTarget.querySelector('.drag-item') === null) {
        e.currentTarget.innerHTML = '';
        e.currentTarget.appendChild(dragItem);
        e.currentTarget.style.backgroundColor = dragItem.getAttribute('data-color');
        dragItem.style.color = '#FFF';
    }

    if (e.currentTarget.getAttribute('data-name') === e.currentTarget.querySelector('.drag-item').getAttribute('data-name')) {
        e.currentTarget.classList.add('correct');
    }

    document.querySelectorAll('.drop-item').forEach(drop => {
        if (drop.innerHTML === '') {

            drop.style.backgroundColor = '#FFF';
            drop.innerHTML = `<span>${drop.getAttribute('data-name')}</span>`;
            drop.classList.remove('correct');
        }
    });
    qtdAcertos();
}

// Functions Neutral Area

function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.drag-item.dragging');
    dragItem.style.color = dragItem.getAttribute('data-color');
    e.currentTarget.appendChild(dragItem);

    document.querySelectorAll('.drop-item').forEach(drop => {
        if (drop.innerHTML === '') {
            drop.style.backgroundColor = '#FFF';
            drop.innerHTML = `<span>${drop.getAttribute('data-name')}</span>`;
            drop.classList.remove('correct');
        }
    });
    qtdAcertos();
}

//  quantidade de Acertos Function
function qtdAcertos() {

    if (document.querySelector('.correct')) {
        acertos = document.querySelectorAll('.correct').length;
        tentativas++;
    } else {
        acertos = document.querySelectorAll('.correct').length;
        tentativas++;
    }

    if (acertos == quantidade) {
        let percent = (acertos * 100) / tentativas;

        document.querySelector('.fim h1').innerHTML = `Voce fez <strong>${percent.toFixed(0)}%</strong>`;

        let areaWidth = document.querySelector('.area').clientWidth;
        document.querySelector('.area').style.marginLeft = `-${areaWidth * 2}px`;
    }
}

//  FIM
document.querySelector('.restart').addEventListener('click', () => {
    document.querySelector('.area').style.marginLeft = `0px`;
});
