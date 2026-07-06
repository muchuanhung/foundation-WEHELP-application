import json
import urllib.request
from functools import lru_cache
# 若要改進： 加錯誤處理、啟動預載、或改讀本地 CSV 當 backup
# 啟動預載：
# 有做 LRU Cache，但可以改用本地 CSV 當 backup
# 使用with open 讀取本地 CSV 當 backup
# 可讀性 可重複 複雜高

HOTELS_CH_URL = (
    "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116"
    ".gitlab.io/hotels-ch"
)
HOTELS_EN_URL = (
    "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116"
    ".gitlab.io/hotels-en"
)

# 資料會存在記憶體
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
