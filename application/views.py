from flask import render_template, jsonify, request
from application import app, conn

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/_petition", methods=['GET', 'POST'])
def petition():
    cur = conn.cursor()

    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        story = request.form.get('story')

        cur.execute("INSERT INTO signature (first_name, last_name, email, story) VALUES (%s, %s, %s, %s);", (first_name, last_name, email, story))


    cur.execute("SELECT first_name, last_name FROM signature;")
    results = cur.fetchall()

    signatures = []
    for signature in results:
        signatures.append(signature[0] + ' ' + signature[1])

    cur.close()
    conn.commit()
    return jsonify({"results": signatures})
