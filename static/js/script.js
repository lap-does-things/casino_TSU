let currentMultiplier = 1;
let rotation = 0;
btn1 = document.getElementById("btn1");
btn2 = document.getElementById("btn2");
btn3 = document.getElementById("btn3");
btn4 = document.getElementById("btn4");
btn5 = document.getElementById("btn5");
var win;

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
    const resultDiv = document.getElementById("resultMessage");
    if (StakeField.value <= 0) {
        // [x] DELETEME alert("Введите сумму ставки");
        resultDiv.innerText = `Введите сумму ставки!`;
        resultDiv.style.display = "flex";
        setTimeout(() => {
            resultDiv.style.display = "none";
            //resultDiv.remove(); //DELETEME
            casinobtn.style.display = "inline-block";
        }, 3000);
        return;
    }
////When you can't even say my name
////Has the memory gone? Are you feeling numb?
////Go and call my name
////I can't play this game, so I ask again
////Will you say my name?
////Has the memory gone? Are you feeling numb?
////Or have I become invisible?

// апишка солида снейка лмао

    $.getJSON(`/casino/krutka?mult=${currentMultiplier}&stake=${StakeField.value}`,
        // Обращаемся по ссылке к API для расчёта результата игры. API в этом же проекте, но зато можно крутить даже из консоли.
        function(data) {
            /* API приведён к следующему виду :
                {
                  "result": {
                    "stake": 200,
                    "win": true
                  }
                }
            */
            win = data.result.win;
            stake = data.result.stake;
            win = false;
            switch (win) {
                case true:
                    turns = 3.65;
                    break;
                case false:
                    turns = 2.8;
                    break;
                default:
                    alert("Что-то пошло ужасно не так, попробуйте ещё раз!");
                    break;
            }
            const casinobtn = document.getElementById("casinobtn");
            casinobtn.style.display = "none";
            const img = document.getElementById("cylinder");
            win = win;
            stake = stake;
            var turns = turns;

            // Генерируем случайный поворот: 3–5 оборотов
            // [x] это ХУЙНЯ!!!!!!!!!!!!!!!!!
            /*
            Обороты никак не связаны с количеством и расположением патронов в барабане.
            Это просто случайный поворот цилиндра, и часто выпадает пуля, когда ты победил и наоборот.

            Я ТРАХАЛ ТОГО КТО ЭТО ПИСАЛ

        (если это не мужик)

        -Лэп.

        P.S. если это правда не мужик, то я серьёзно ;)
            */

        // https://a.d-cd.net/R34aG_8UGYblYQsYHOgDR9h9jMA-960.jpg

            //turns = Math.floor(Math.random() * 5) + 11;

            rotation += 360 * turns;
            img.classList.remove("rotate");
            img.style.transform = `rotate(${rotation}deg)`;

            // Через 2.1 секунды — когда закончится анимация — показываем результат
            setTimeout(() => {

                const resultDiv = document.getElementById("resultMessage");
                if (!win == true) {
                    resultDiv.innerText = `Вы проиграли! Вы лишились ${stake} рублей!`;
                    StakeField.value = Number(StakeField.value) - stake; // TODO : ЗАМЕНИТЬ VALUE НА ОБЩИЙ СЧЕТ ЮЗНИ
                    if (StakeField.value < stake) {
                        resultDiv.innerText = `Вы проиграли! Вы безбожно лишились ${stake / currentMultiplier} рублей!`;
                        StakeField.value = 0;
                    }
                } else {
                    resultDiv.innerText = `Вы победили!  Вы получили ${stake} рублей!`;
                    StakeField.value = Number(StakeField.value) + stake;
                }
                resultDiv.style.display = "flex";
                img.style.transform = `rotate(0deg)`;
                    // !!!! ВАЖНО !!! это сброс анимации, чтобы углы сверху работали
                    // !!!!! Если ты их уберешь, будет рассинхрон в анимации и исходе крутки !!!!
                    // !!!! да и вообще выглядит пиздато тоже !!!!

                // Убрать через 3 секунды
                setTimeout(() => {
                    resultDiv.style.display = "none";
                    casinobtn.style.display = "inline-block";
                }, 3000);
            }, 2100);
            turns = 0;
            rotation = 0;
            return turns;
        }

    );
    // Люблю вас, ребята. Это было тяжело, но весело.  - Лэп.
});
