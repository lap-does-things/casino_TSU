from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
