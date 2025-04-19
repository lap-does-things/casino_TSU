from flask import Flask, render_template, jsonify, request
import random, MySQLdb.cursors, re, flask_mysqldb

app = Flask(__name__)
app.secret_key = 'not-so-secret'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'russian_roulette'

mysql = flask_mysqldb.MySQL(app)


@app.route('/')
def home():
    return render_template('index.html')
@app.route('/casino/krutka')
def casino():
    mult = request.args.get('mult')
    stake = request.args.get('stake')
    stake = int(stake)
    mult = int(mult)
    магическоерандомноечисло = random.randint(1,6)
    if магическоерандомноечисло <= int(mult):
        return jsonify(result={'win' : False, 'stake' : int(stake*mult)})
    else :return jsonify(result={'win' :  True, 'stake' : int(stake*mult)})

@app.route('/user/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
