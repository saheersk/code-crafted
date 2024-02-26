from __future__ import absolute_import, unicode_literals
import os

from django.conf import settings

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user_service.settings')

app = Celery('user_service')
app.conf.enable_utc = False
app.conf.update(timezone='Asia/Kolkata')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.broker_connection_retry_on_startup = True 

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
app.autodiscover_tasks(['api.v1.user'])

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')