document.addEventListener('DOMContentLoaded', function() {
    const cylinder = document.getElementById('cylinder');
    const spinButton = document.getElementById('spin');
    const multiplierButtons = document.querySelectorAll('.multiplier');
    let selectedMultiplier = 1;

    // Добавляем константы для логики игры
    const BULLET_POSITION = 0; // Патрон всегда в позиции 0° (верх)
    const SECTOR_SIZE = 60; // 360° / 6 слотов

    // Инициализация
    function init() {
        // Сброс позиции барабана
        cylinder.style.transform = 'rotate(0deg)';
        // Активируем первую кнопку
        if (multiplierButtons.length > 0) {
            selectMultiplier(multiplierButtons[0]);
        }
    }

    // Выбор множителя
    function selectMultiplier(button) {
        multiplierButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedMultiplier = parseInt(button.dataset.multiplier);

        // Меняем изображение барабана в зависимости от множителя
        cylinder.src = `/static/images/cylinder${selectedMultiplier}.png`;
        console.log(`Установлено изображение: cylinder${selectedMultiplier}.png`);
    }

    // Обработчики кнопок множителя
    multiplierButtons.forEach(button => {
        button.addEventListener('click', () => selectMultiplier(button));
    });

    // Функция определения результата
    function getResult(finalAngle) {
        // Нормализуем угол (0–360)
        const normalizedAngle = (360 - (finalAngle % 360) + 360) % 360;

        // Специфический сектор 0: от 330 до 360 и от 0 до 30
        let slotPosition;
        if (normalizedAngle >= 330 || normalizedAngle < 30) {
            slotPosition = 0;
        } else {
            slotPosition = Math.floor((normalizedAngle - 30) / 60) + 1;
        }

        const loseSlots = {
            1: [0],
            2: [0, 5],
            3: [0, 5, 4],
            4: [0, 5, 4, 3],
            5: [0, 5, 4, 3, 2]
        };

        const isLose = loseSlots[selectedMultiplier].includes(slotPosition);

        return {
            win: !isLose,
            angle: normalizedAngle,
            slot: slotPosition
        };
    }

    // Обработчик вращения
    spinButton.addEventListener('click', async function() {
        if (spinButton.disabled) return;

        spinButton.disabled = true;

        // Случайные параметры вращения
        const rotations = 7 + Math.floor(Math.random() * 9);
        const randomOffset = Math.random() * 360; // случайный угол от 0 до 360
        const finalSlot = Math.floor(Math.random() * 6); // 0-5
        const finalAngleDegrees = finalSlot * SECTOR_SIZE;
        const totalRotation = 360*5 + rotations * randomOffset;

        // Анимация
        cylinder.style.transition = `transform ${3 + rotations * 0.2}s cubic-bezier(0.3, 0.7, 0.2, 1)`;
        cylinder.style.transform = `rotate(${totalRotation}deg)`;

        // Определение результата
        setTimeout(async () => {
            const result = getResult(totalRotation);
            console.log(`Выпал слот: ${result.slot} (${result.angle}°), ${result.win ? 'Выигрыш' : 'Проигрыш'}`);

            try {
                const response = await fetch("/game", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        'bet': document.getElementById('bet').value,
                        'multiplier': selectedMultiplier,
                        'is_win': result.win ? '1' : '0'
                    })
                });

                if (!response.ok) throw new Error('Ошибка сервера');

                const html = await response.text();
                updatePage(html);

            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                resetCylinderAnimation();
            }
        }, (3 + rotations * 0.2) * 1000);
    });

    // Сброс анимации барабана
    function resetCylinderAnimation() {
        cylinder.style.transition = 'none';
        cylinder.style.transform = 'rotate(0deg)';

        // Небольшая задержка перед возвращением transition
        setTimeout(() => {
            cylinder.style.transition = 'transform 3s ease-out';
            spinButton.disabled = false;
        }, 10);
    }

    // Отправка результата на сервер
    async function sendResultToServer(bet, isWin) {
        try {
            const response = await fetch("/game", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'bet': bet,
                    'multiplier': selectedMultiplier,
                    'is_win': isWin ? '1' : '0'
                })
            });

            if (!response.ok) throw new Error('Ошибка сервера');
            const html = await response.text();
            updatePage(html);
        } catch (error) {
            console.error('Ошибка:', error);
            spinButton.disabled = false;
        }
    }

    function updatePage(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.getElementById('result').innerHTML =
            doc.getElementById('result').innerHTML;
        document.getElementById('balance').textContent =
            doc.getElementById('balance').textContent;
    }

    // Инициализация
    init();
});