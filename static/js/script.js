let currentMultiplier = 1;
let rotation = 0;

function setMultiplier(x) {
    currentMultiplier = x;
    const img = document.getElementById("cylinder");
    img.src = `/static/images/cylinder${x}.png`;
}

document.querySelector('.submit-btn').addEventListener('click', () => {
    const img = document.getElementById("cylinder");

    // Генерируем случайный поворот: 3–5 оборотов
    const turns = Math.floor(Math.random() * 5) + 11;
    rotation += 360 * turns;

    img.style.transform = `rotate(${rotation}deg)`;

    img.classList.remove("rotate"); // сброс, если уже был запуск
    void img.offsetWidth; // форс пересчёт layout — для повторной анимации
    img.classList.add("rotate");

    // Через 2.1 секунды — когда закончится анимация — показываем результат
    setTimeout(() => {
        const totalSlots = 6;
        const bullets = currentMultiplier; // сколько патронов
        const winningSlot = Math.floor(Math.random() * totalSlots) + 1;

        const resultDiv = document.getElementById("resultMessage");
        if (winningSlot <= bullets) {
            resultDiv.innerText = "Вы проиграли...";
        } else {
            resultDiv.innerText = "Вы победили!";
        }
        resultDiv.style.display = "flex";

        // Убрать через 3 секунды
        setTimeout(() => {
            resultDiv.style.display = "none";
        }, 3000);
    }, 2100);
});
