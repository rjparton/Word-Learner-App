import json
import requests
app_id  = "69a3a6e5"
app_key  = "0098d766e262e8cd0b75cdf9e96b7b65"
endpoint = "entries"
language_code = "en-us"
word_id = "example"
url = "https://od-api.oxforddictionaries.com/api/v2/" + endpoint + "/" + language_code + "/" + word_id.lower()
r = requests.get(url, headers = {"app_id": app_id, "app_key": app_key})
print("code {}\n".format(r.status_code))
print("text \n" + r.text)
print("json \n" + json.dumps(r.json()))