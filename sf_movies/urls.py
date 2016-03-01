from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

from views import home

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('api.urls'))
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
