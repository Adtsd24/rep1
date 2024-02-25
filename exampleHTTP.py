import requests
import os

filename = "download.zip"
url = "https://github.com/Adtsd24/rep1/archive/refs/heads/main.zip"

try:
    website = requests.get(url)
    if website.status_code == 200:
        print("OK, Status code 200. Everything is OK.")
    elif website.status_code == 404:
        print("Error 404: Not found. Aborting operation.")
        exit()
    elif website.status_code == 403:
        print("Error 403: Forbidden. Aborting operation.")
        exit()
    else:
        print(f"Unexpected status code {website.status_code}. Aborting operation.")
        exit()

    with open(filename, 'wb') as fd:
        for chunk in website.iter_content(chunk_size=128):
            fd.write(chunk)

    fileSize = os.path.getsize(filename)
    if fileSize != 1258:
        print("Error: file size is not correct!")
        os.remove(filename)
        exit()

except requests.exceptions.RequestException as e:
    print(f"An error occurred while making the request: {e}")
