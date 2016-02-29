from django.http import HttpResponse
from django.template.response import TemplateResponse
import datetime

def home(request):
    now = datetime.datetime.now()
    return TemplateResponse(request, 'index.html')
