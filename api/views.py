from django.http import JsonResponse
from django.conf import settings
import json
import os

data_file_path = settings.MOVIE_DATA_FILE_PATH
movie_data = {}


"""
movie_data is the list of movie objects(dictionary with name and locations as keys)
It's loaded from file as of now, but can be stored in DB when needed 
"""
with open(data_file_path) as data_file:
    movie_data = json.load(data_file)['data']


"""
Fetch movie data(name and list of screening locations) for movies satisfying the query
criteria(query string should be a substring of movie name)
"""
def get_movie_data(request):
    query_string = request.GET.get('name', '')
    if query_string:
        response_dict = filter(lambda ob: slugify(query_string) in slugify(ob['name']), movie_data)
        return JsonResponse(response_dict, safe=False)
    else:
        return JsonResponse([], safe=False)

def slugify(st):
    return "".join(st.lower().split())

