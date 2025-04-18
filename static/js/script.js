let currentMultiplier = 1;
let rotation = 0;

function setMultiplier(x) {
        document.getElementById("btn1").classList.remove("green");
        document.getElementById("btn2").classList.remove("green");
        document.getElementById("btn3").classList.remove("green");
        document.getElementById("btn4").classList.remove("green");
        document.getElementById("btn5").classList.remove("green");
        document.getElementById("btn1").classList.remove("red");
        document.getElementById("btn2").classList.remove("red");
        document.getElementById("btn3").classList.remove("red");
        document.getElementById("btn4").classList.remove("red");
        document.getElementById("btn5").classList.remove("red");
    switch (x) {
        case 1:
            document.getElementById("btn1").classList.add("green");
            document.getElementById("btn2").classList.add("red");
            document.getElementById("btn3").classList.add("red");
            document.getElementById("btn4").classList.add("red");
            document.getElementById("btn5").classList.add("red");
            break;
        case 2:
            document.getElementById("btn2").classList.add("green");
            document.getElementById("btn1").classList.add("red");
            document.getElementById("btn3").classList.add("red");
            document.getElementById("btn4").classList.add("red");
            document.getElementById("btn5").classList.add("red");
            break;
        case 3:
            document.getElementById("btn3").classList.add("green");
            document.getElementById("btn2").classList.add("red");
            document.getElementById("btn1").classList.add("red");
            document.getElementById("btn4").classList.add("red");
            document.getElementById("btn5").classList.add("red");
            break;
        case 4:
            document.getElementById("btn4").classList.add("green");
            document.getElementById("btn2").classList.add("red");
            document.getElementById("btn3").classList.add("red");
            document.getElementById("btn1").classList.add("red");
            document.getElementById("btn5").classList.add("red");
            break;
        case 5:
            document.getElementById("btn5").classList.add("green");
            document.getElementById("btn2").classList.add("red");
            document.getElementById("btn3").classList.add("red");
            document.getElementById("btn4").classList.add("red");
            document.getElementById("btn1").classList.add("red");
            break;
    }
    currentMultiplier = x;
    const img = document.getElementById("cylinder");
    img.src = `/static/images/cylinder${x}.png`;
}

document.querySelector('.submit-btn').addEventListener('click', () => {
    $.getJSON(`/nigger/cock?mult=${currentMultiplier}`,
        function(data, textStatus, jqXHR) {
            win = data.result.win;
        }
    );
    const niggerbtn = document.getElementById("niggerbtn");
    niggerbtn.style.display = "none";
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
        if (win == 'nenihuya') {
            resultDiv.innerText = "Вы проиграли!";
        } else {
            resultDiv.innerText = "Вы победили!";
        }
        resultDiv.style.display = "flex";
        // Я ТРАХАЛ ВОЛА XDDDDD
        // Убрать через 3 секунды
        setTimeout(() => {
            resultDiv.style.display = "none";
            //resultDiv.remove();
            niggerbtn.style.display = "inline-block";
        }, 3000);
    }, 2100);
});
