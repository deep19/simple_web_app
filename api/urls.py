from django.conf.urls import include, url, patterns
from api.views import get_movie_data

urlpatterns = [
    url(r'^get_movie_data/$', get_movie_data, name='get_movie_data' ),
]
