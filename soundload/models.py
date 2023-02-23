from json import loads, dumps
from random import choice
from sclib import SoundcloudAPI
from os.path import isfile
from collections import Counter
from re import search

class BaseModel:
    def __init__(self, db:str):
        self.db_path = db
        self.db:dict = loads(open(self.db_path).read())

    def get(self, guid:str) -> dict :
        return {"status": "OK", "statuscode": 200, "data": {"object": self.db[guid]}} if guid in list(self.db.keys()) else {"status": "ERROR", "statuscode": 404, "data": {"message": "object not found"}}

    def getAll(self) -> dict:
        return {"status": "OK", "statuscode": 200, "data": {"db": self.db}}

    def makeGUID(self, start_char:str, length:int=32) -> str:
        choices = [*"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"]
        selected = start_char + "".join([choice(choices) for i in range(length - len(start_char))])
        while self.get(selected)["statuscode"] != 404 :
            # make a new UUID while this UUID is exist in table
            selected = start_char + "".join([choice(choices) for i in range(length - len(start_char))])
        return selected

    def delete(self, guid:str):
        if self.db.get(guid) != None:
            self.db.pop(guid)
            with open(self.db_path, "w") as writer: writer.write(dumps(self.db, indent=4, ensure_ascii=False))
            return {"status": "OK", "statuscode": 200, "data": {}}
        return {"status": "ERROR", "statuscode": 404, "data": {"message": "object not found"}}

    def edit(self, guid:str, key:str, value:any) -> dict:
        self.db[guid][key] = value
        with open(self.db_path, "w") as writer: writer.write(dumps(self.db, indent=4, ensure_ascii=False))
        return {"status": "OK", "statuscode": 200, "data": {"object": self.db[guid]}}
        
class User(BaseModel):
    def __init__(self):
        super().__init__("static/dbs/accounts.json")

    def new(self) -> dict:
        ID = self.makeGUID('u')
        self.db[ID] = {
            "id": ID,
            "downloads": [],
            "artists": []
        }
        with open("static/dbs/accounts.json", "w") as writer: writer.write(dumps(self.db, indent=4, ensure_ascii=False))
        return {"status": "OK", "statuscode": 200, "data": {"object": self.db[ID]}}

    def download(self, guid:str, link:str) -> dict:
        link = search(r'https\:\/\/soundcloud\.com\/.+\?', link).group()[:-1] if "?" in link else link
        Type = "playlist" if "/sets/" in link else "track"
        resp = SoundcloudAPI('VTl9gNS05wF10zfiwKJ6FwK9mJsLVuAV').resolve(link)
        dlLinks = []
        if Type == "track":
            filename = f'static/uploads/{resp.artist} - {resp.title}.mp3'
            if not isfile(filename):
                resp.write_mp3_to(open(filename, "wb+"))
            dlLinks.append(filename)
            if not resp.permalink_url in [i["link"] for i in self.db[guid]["downloads"]]: self.db[guid]['downloads'].append({"link": resp.permalink_url, "cover": resp.artwork_url, "name": resp.title, "artist": resp.artist})
            self.db[guid]['artists'].append({"link": resp.user['permalink_url'], "avatar": resp.user['avatar_url'], "name": resp.artist})
        else:
            for track in resp.tracks:
                filename = f'static/uploads/{track.artist} - {track.title}.mp3'
                if not isfile(filename):
                    track.write_mp3_to(open(filename, "wb+"))
                dlLinks.append(filename)
                if not track.permalink_url in [i["link"] for i in self.db[guid]["downloads"]]: self.db[guid]['downloads'].append({"link": track.permalink_url, "cover": track.artwork_url, "name": track.title, "artist": track.artist})
                self.db[guid]['artists'].append({"link": track.user['permalink_url'], "avatar": track.user['avatar_url'], "name": track.artist})
        User().edit(guid, 'downloads', self.db[guid]['downloads'])
        User().edit(guid, 'artists', self.db[guid]['artists'])
        print(resp, dlLinks)
        return {"status": "OK", "statuscode": 200, "data": {"obj": resp, "links": dlLinks, "user": self.db[guid]}}

    def getTopFavArtists(self, guid:str, count:int=3) -> dict:
        return {"status": "OK", "statuscode": 200, "data": {"results": [loads(i[0]) for i in Counter([dumps(i) for i in self.db[guid]['artists']]).most_common(count)]}}