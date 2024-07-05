const goal = 70;
let casesNumber = parseInt(localStorage.getItem('casesNumber')) || 0;
let progressBar = 0;

let caseInput = document.getElementById('caseInput');
const enterCaseBtn = document.getElementById('enterCase');
let casesList = document.getElementById('cases-list');
let currentCases = document.getElementById('currentCases');

// Cargar casos de la lista al recargar la pagina
window.addEventListener('load', () => {
    const storedCases = JSON.parse(localStorage.getItem('cases') || '[]');
    storedCases.forEach(caseText => {
        const newCase = document.createElement('li');
        newCase.textContent = caseText;
        casesList.appendChild(newCase);
    });

    currentCases.innerHTML = casesNumber;

    updateProgressBar();
} )

function updateProgressBar(){
    const percentage = (casesNumber / goal) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percentage}%`;
}

function addCase(){
    const newCase = document.createElement('li')
    let caseText = caseInput.value.trim();
    newCase.textContent = caseText;
    casesList.appendChild(newCase);

    let caseSum = casesNumber += 1;
    currentCases.innerHTML = caseSum;

    const elemento = document.querySelector('.animacion');
        elemento.classList.remove('animacion');
        void elemento.offsetWidth;
        elemento.classList.add('animacion');

    // Guardar elemento en localStorage
    const storedCases = JSON.parse(localStorage.getItem('cases') || '[]');
    storedCases.push(newCase.textContent);
    localStorage.setItem('cases', JSON.stringify(storedCases));
    localStorage.setItem('casesNumber', casesNumber);

    updateProgressBar();

    caseInput.value = '';
}
// Agregar elemento a la lista de casos al presionar boton
enterCaseBtn.addEventListener('click', addCase);

caseInput.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        addCase();
    }
})


// Cada vez que se agregue un elemento a la lista de casos, se debe agregar una unidad en current cases


// Debe haber un boton para limpiar la lista de casos del dia para el inicio de un nuevo dia de produccion, al eliminar la lista del dia, la lista debe guardarse en un dia especifico para llevar registro de la produccion de cada dia

function clearDay(){
    localStorage.clear();
    while (casesList.firstChild){
        casesList.removeChild(casesList.firstChild)
    }
    casesNumber = 0;
    currentCases.innerHTML = casesNumber;
    updateProgressBar();
};
const clearDayBtn = document.getElementById('clearDay');
clearDayBtn.addEventListener('click', clearDay);


