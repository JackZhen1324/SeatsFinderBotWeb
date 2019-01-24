"""
WSGI config for seatsfinderbots project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os
import os.path
import join,dirname,abspath
PROJECT_DIR = dirname(dirname(abspath(_file_)))
import  sys
sys.path.insert(0,PROJECT_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seatsfinderbots.settings')
from django.core.wsgi import get_wsgi_application


application = get_wsgi_application()
