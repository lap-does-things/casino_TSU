from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

@app.route('/')

def home():
    return render_template('index.html')
@app.route('/nigger/cock')
def nigger():
    mult = request.args.get('mult')
    магическоерандомноечисло = random.randint(1,6)
    if магическоерандомноечисло <= int(mult):
        return jsonify(result={'win' : 'nenihuya'})
    else :return jsonify(result={'win' : 'huya'})
if __name__ == '__main__':
    app.run(debug=True)
