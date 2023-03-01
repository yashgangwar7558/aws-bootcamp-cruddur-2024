import os
from dotenv import load_dotenv

load_dotenv()

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
OTEL_EXPORTER_OTLP_ENDPOINT = os.getenv('OTEL_EXPORTER_OTLP_ENDPOINT')
OTEL_EXPORTER_OTLP_HEADERS = os.getenv('OTEL_EXPORTER_OTLP_HEADERS')
OTEL_SERVICE_NAME = os.getenv('OTEL_SERVICE_NAME')
FRONTEND = os.getenv('FRONTEND_URL')
BACKEND = os.getenv('BACKEND_URL')
AWS_DEFAULT_REGION = os.getenv('AWS_DEFAULT_REGION')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_XRAY_URL = os.getenv('AWS_XRAY_URL')
ROLLBAR_ACCESS_TOKEN = os.getenv('ROLLBAR_ACCESS_TOKEN')
ENV=os.getenv('ENV')
