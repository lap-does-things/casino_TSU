from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'


# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE,
            password TEXT,
            balance REAL DEFAULT 1000.0
        )
    ''')
    conn.commit()
    conn.close()


init_db()


@app.route('/')
def home():
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login = request.form['login']
        password = request.form['password']

        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        cursor.execute('SELECT id, password FROM users WHERE login = ?', (login,))
        user = cursor.fetchone()

        if user:
            user_id, hashed_password = user
            if check_password_hash(hashed_password, password):
                session['user_id'] = user_id
                conn.close()
                return redirect(url_for('game'))
        else:
            hashed_password = generate_password_hash(password)
            cursor.execute('INSERT INTO users (login, password) VALUES (?, ?)', (login, hashed_password))
            conn.commit()
            user_id = cursor.lastrowid
            session['user_id'] = user_id

        conn.close()
        return redirect(url_for('game'))

    return render_template('login.html')


@app.route('/game', methods=['GET', 'POST'])  # Разрешаем оба метода
def game():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # GET запрос (загрузка страницы)
    if request.method == 'GET':
        cursor.execute('SELECT balance FROM users WHERE id = ?', (session['user_id'],))
        balance = cursor.fetchone()[0]
        conn.close()
        return render_template('game.html', balance=balance)

    # POST запрос (обработка ставки)
    if request.method == 'POST':
        bet = float(request.form['bet'])
        multiplier = int(request.form['multiplier'])
        is_win = request.form.get('is_win') == '1'

        cursor.execute('SELECT balance FROM users WHERE id = ?', (session['user_id'],))
        balance = cursor.fetchone()[0]

        if bet > balance:
            conn.close()
            return render_template('game.html', error="Недостаточно средств")

        if is_win:
            win_amount = bet * multiplier
            new_balance = balance + win_amount
            result = f"Вы выиграли {win_amount} рублей!"
        else:
            new_balance = balance - bet * multiplier
            result = "Вы проигрываете ставку!"

        cursor.execute('UPDATE users SET balance = ? WHERE id = ?', (new_balance, session['user_id']))
        conn.commit()
        conn.close()

        return render_template('game.html', result=result, balance=new_balance)


@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT login, balance FROM users WHERE id = ?', (session['user_id'],))
    user = cursor.fetchone()
    conn.close()

    if user:
        login, balance = user
        return render_template('profile.html', login=login, balance=balance)

    return redirect(url_for('login'))


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)