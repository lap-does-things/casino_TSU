let currentMultiplier = 1;
let rotation = 0;
btn1 = document.getElementById("btn1");
btn2 = document.getElementById("btn2");
btn3 = document.getElementById("btn3");
btn4 = document.getElementById("btn4");
btn5 = document.getElementById("btn5");

function setMultiplier(x) {
        btn1.classList.remove("green");
        btn2.classList.remove("green");
        btn3.classList.remove("green");
        btn4.classList.remove("green");
        btn5.classList.remove("green");
        btn1.classList.remove("red");
        btn2.classList.remove("red");
        btn3.classList.remove("red");
        btn4.classList.remove("red");
        btn5.classList.remove("red");
    switch (x) {
        case 1:
            btn1.classList.add("green");
            btn2.classList.add("red");
            btn3.classList.add("red");
            btn4.classList.add("red");
            btn5.classList.add("red");
            break;
        case 2:
            btn2.classList.add("green");
            btn1.classList.add("red");
            btn3.classList.add("red");
            btn4.classList.add("red");
            btn5.classList.add("red");
            break;
        case 3:
            btn3.classList.add("green");
            btn2.classList.add("red");
            btn1.classList.add("red");
            btn4.classList.add("red");
            btn5.classList.add("red");
            break;
        case 4:
            btn4.classList.add("green");
            btn2.classList.add("red");
            btn3.classList.add("red");
            btn1.classList.add("red");
            btn5.classList.add("red");
            break;
        case 5:
            btn5.classList.add("green");
            btn2.classList.add("red");
            btn3.classList.add("red");
            btn4.classList.add("red");
            btn1.classList.add("red");
            break;
    }
    currentMultiplier = x;
    const img = document.getElementById("cylinder");
    img.src = `/static/images/cylinder${x}.png`;
}

document.querySelector('.submit-btn').addEventListener('click', () => {
    const StakeField = document.getElementById("stake");
    $.getJSON(`/casino/krutka?mult=${currentMultiplier}&stake=${StakeField.value}`,
        function(data) {
            win = data.result.win;
            stake = data.result.stake;
        }
    );
    const casinobtn = document.getElementById("casinobtn");
    casinobtn.style.display = "none";
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

        const resultDiv = document.getElementById("resultMessage");
        if (!win) {
            resultDiv.innerText = `Вы проиграли! Вы лишились ${stake} рублей!`;
            StakeField.value = Number(StakeField.value) - stake; // TODO : ЗАМЕНИТЬ VALUE НА ОБЩИЙ СЧЕТ ЮЗНИ
            if (StakeField.value < stake) {
                resultDiv.innerText = `Вы проиграли! Вы безбожно лишились ${stake} рублей!`;
                StakeField.value = 0;
            }
        } else {
            resultDiv.innerText = `Вы победили!  Вы получили ${stake} рублей!`;
            StakeField.value = Number(StakeField.value) + stake;
        }
        resultDiv.style.display = "flex";

        // Убрать через 3 секунды
        setTimeout(() => {
            resultDiv.style.display = "none";
            //resultDiv.remove();
            casinobtn.style.display = "inline-block";
        }, 3000);
    }, 2100);
});
