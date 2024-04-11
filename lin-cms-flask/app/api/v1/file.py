from flask import Blueprint, request
from werkzeug.utils import secure_filename
import os
import uuid
import json

file_api = Blueprint('file', __name__)

UPLOAD_FOLDER = 'static/megData'

@file_api.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return {"error": "No file part in the request."}, 400

    file = request.files['file']

    if file.filename == '':
        return {"error": "No selected file."}, 400

    if file:
        filename = secure_filename(file.filename)
        # Generate a unique filename using uuid
        filename = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return {"message": "File uploaded successfully.", "file_path": file_path}, 200


@file_api.route('/sendData', methods=['GET', 'POST'])
def send_Data():
    with open('assets/megData/tmp/raw_json.json', 'r') as f:
        data = json.load(f)
    return data



