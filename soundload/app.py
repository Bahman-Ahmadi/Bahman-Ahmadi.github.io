from flask import Flask, request, jsonify, render_template
from json import loads, dumps
from lib import SoundcloudAPI
from models import User

app = Flask(__name__)

def jsonification(dictionary:dict):
    return jsonify(dictionary).headers.add("Access-Control-Allow-origin", "*")

############ VIEWS ############
@app.route('/')
def index():
    args = [request.args[i] for i in request.args]
    user = User().get(args[0])['data']['object']
    favs = User().getTopFavArtists(args[0])['data']['results']
    return render_template('index.html', user=user, userFavArtists=favs)

@app.route('/dl')
def dl():
    args = [request.args[i] for i in request.args]
    return render_template('dl.html', result=User().download(args[0], args[1])['data'])

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

if __name__ == '__main__':
    app.run(debug=True)