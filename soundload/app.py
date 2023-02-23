from flask import Flask, request, jsonify, redirect, render_template
from json import loads, dumps
from sclib import SoundcloudAPI
from models import User
from werkzeug.exceptions import HTTPException

app = Flask(__name__)

def jsonification(dictionary:dict):
    return jsonify(dictionary).headers.add("Access-Control-Allow-origin", "*")

############ VIEWS ############
@app.route('/')
def index():
    args = [request.args[i] for i in request.args]
    try:
        user = User().get(args[0])['data']['object']
        favs = User().getTopFavArtists(args[0])['data']['results']
    except:
        user = {"id": args[0], "downloads": [], "artists": []}
        favs = []
    return render_template('index.html', user=user, userFavArtists=favs)

@app.route('/dl')
def dl():
    args = [request.args[i] for i in request.args]
    return render_template('dl.html', result=User().download(args[0], args[1])["data"])

############ API ############
@app.route('/api/getSCObject', methods=["POST"])
def getSCObject():
    # get sound cloud object
    args = [request.form[i] for i in request.form]
    return SoundcloudAPI().resolve(args[0])

@app.route('/api/user')
def user():
    # manage app users (add/edit/get)
    args = [request.args[i] for i in request.args]
    if args[0] == "add": return User().new()
    elif args[0] == "edit": return User().edit(args[1], args[2], args[3])
    elif args[0] == "get": return User().get(args[1])
    return {"status": "ERROR", "statuscode": 400, "data": {"message": "invalid input"}}

@app.route('/api/download')
def download():
    # download track or playlist
    args = [request.args[i] for i in request.args]
    return User().download(*args)

@app.route('/api/favArtists')
def getFavoriteArtist():
    # get top 3 favorite artists
    args = [request.args[i] for i in request.args]
    return User().getTopFavArtists(*args)


'''
@app.errorhandler(Exception)
def handle_error(e):
    return redirect("/?id=undefined")
'''

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)