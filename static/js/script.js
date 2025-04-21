let currentMultiplier = 1;
let rotation = 0;
var win;
multbtns = [];

for (let i = 1; i <= 5; i++) { // Объявление кнопок и пуш в массив
    let btn = document.getElementById(`btn${i}`); // i.e. i=1 => btn1, i=2 => btn2, и т.д.
    btn.addEventListener("click", function() {
        setMultiplier(i);
    });
    multbtns.push(btn);
}

function setMultiplier(x) {
    multbtns.forEach(function(btn) {
        btn.classList.remove("green");
    });
    $(`#btn${x}`).addClass("green"); // Ьоже как же я горд тем, что я до этого додумался
    // Целый экран текста сжат до 4 строк.
    currentMultiplier = x;
    const img = document.getElementById("cylinder");
    img.src = `/static/images/cylinder${x}.png`;
}

document.querySelector('.submit-btn').addEventListener('click', () => {
    const StakeField = document.getElementById("stake");
    const resultDiv = document.getElementById("resultMessage");
    if (StakeField.value <= 0) {
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
        // [x] Обращаемся по ссылке к API для расчёта результата игры. API в этом же проекте, но зато можно крутить даже из консоли.
        function(data) {
            /* JSON API приведён к следующему виду :
                {
                  "result": {
                    "stake": 200,
                    "win": true
                  }
                }
            */
            win = data.result.win;
            stake = data.result.stake;
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
