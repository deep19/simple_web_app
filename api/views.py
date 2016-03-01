from django.http import JsonResponse
from django.conf import settings
import json
import os

data_file_path = os.path.join(settings.BASE_DIR, 'data/row2.json')
movie_data = {}

with open(data_file_path) as data_file:
    movie_data = json.load(data_file)['data']


def get_movie_data(request):
    query_string = request.GET.get('name', '')
    if query_string:
        response_dict = filter(lambda ob: slugify(query_string) in slugify(ob['name']), movie_data)
        return JsonResponse(response_dict, safe=False)
    else:
        return JsonResponse([], safe=False)

def slugify(st):
    return "".join(st.lower().split())



