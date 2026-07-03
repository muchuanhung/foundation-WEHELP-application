import json
import urllib.request
from functools import lru_cache

HOTELS_CH_URL = (
    "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116"
    ".gitlab.io/hotels-ch"
)
HOTELS_EN_URL = (
    "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116"
    ".gitlab.io/hotels-en"
)


@lru_cache
def get_hotels_by_id():
    with urllib.request.urlopen(HOTELS_CH_URL) as response:
        chinese_list = json.loads(response.read().decode("utf-8"))["list"]

    with urllib.request.urlopen(HOTELS_EN_URL) as response:
        english_list = json.loads(response.read().decode("utf-8"))["list"]

    english_lookup = {hotel["_id"]: hotel for hotel in english_list}
    hotels = {}

    for index, chinese_hotel in enumerate(chinese_list, start=1):
        english_hotel = english_lookup.get(chinese_hotel["_id"], {})
        hotels[index] = {
            "chinese_name": chinese_hotel["旅宿名稱"],
            "english_name": english_hotel.get("hotel name", ""),
            "phone": chinese_hotel["電話或手機號碼"],
        }

    return hotels
