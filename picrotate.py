from flask import Flask, request, render_template, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'images'
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # Max upload size: 10MB

@app.route('/')
def index():
    image_filenames = os.listdir(app.config['UPLOAD_FOLDER'])
    return render_template('index.html', image_filenames=image_filenames)


@app.route('/settings', methods=['GET', 'POST'])
def settings():
    image_filenames = os.listdir(app.config['UPLOAD_FOLDER'])
    if request.method == 'POST':
        files = request.files.getlist('file')
        for file in files:
            if file:
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
        return redirect(url_for('settings'))
    return render_template('settings.html', image_filenames=image_filenames)

from flask import send_from_directory

@app.route('/delete_image', methods=['DELETE'])
def delete_image():
    filename = request.args.get('filename')
    if filename:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        try:
            os.remove(filepath)
            return jsonify(status='success')
        except:
            return jsonify(status='failure')

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
