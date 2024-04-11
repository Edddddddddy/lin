from flask import Blueprint

from app.api.v1.book import book_api
from app.api.v1.file import file_api

def create_v1():
    bp_v1 = Blueprint("v1", __name__)
    bp_v1.register_blueprint(book_api, url_prefix="/book")
    bp_v1.register_blueprint(file_api, url_prefix="/file")
    return bp_v1
