# Week 2 — Distributed Tracing

## Homework
   
| TASK | COMPLETED |
|  --- |    ---    |
| Watch How to Ask for Technical Help | :heavy_check_mark: |

## Notes

### For local development without Gitpods(all credits used up) setup:
Add the following to the `requirements.txt`
```
python-dotenv
```
Create `.env` file and put all the environment variables there
```
ENV_VARIABLE_1="VALUE"
ENV_VARIABLE_2="VALUE"
ENV_VARIABLE_3="VALUE"
ENV_VARIABLE_4="VALUE"
```
Create `env.py` file where `app.py` resides in the project
```
import os
from dotenv import load_dotenv

load_dotenv()

ENV_VARIABLE_1 = os.getenv('ENV_VARIABLE_1')
ENV_VARIABLE_2 = os.getenv('ENV_VARIABLE_1')
ENV_VARIABLE_3 = os.getenv('ENV_VARIABLE_1')
```
Then import the `env.py` into your `app.py`
```
# top of app.py file
from env import *
```

### HoneyComb
Add the following to the `requirements.txt`
```
opentelemetry-api 
opentelemetry-sdk 
opentelemetry-exporter-otlp-proto-http 
opentelemetry-instrumentation-flask 
opentelemetry-instrumentation-requests
```
Install the depedencies
```
pip install -r requirements.txt
```
Add to the `app.py`
```
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
```
```
# Initialize tracing and an exporter that can send data to Honeycomb
provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter())
provider.add_span_processor(processor)

# Could use a different proccessor, ConsoleSpanExporter is good for debugging
simple_processor = SimpleProcessor(ConsoleSpanExporter())
provider.add_span_processor(simple_processor)

trace.set_tracer_provider(provider)
tracer = trace.get_tracer(__name__)
```


```
# Initialize automatic instrumentation with Flask
app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()
```
Add the following env variables to `backend-flask` in docker compose:
API Key can be found at the top of the HoneyComb dev portal.
service name is up to the team to decide to differentiate from other services they may want to track.

http://honeycomb-whoami.glitch.me can be used to see what current scopes are allowd with the API key.
```
OTEL_EXPORTER_OTLP_ENDPOINT: "https://api.honeycomb.io"
OTEL_EXPORTER_OTLP_HEADERS: "x-honeycomb-team=${HONEYCOMB_API_KEY}"
OTEL_SERVICE_NAME: "${HONEYCOMB_SERVICE_NAME}"
```

### CloudWatch
Add to the requirements.txt
```
watchtower
```
```
pip install -r requirements.txt
```
In `app.py`
```
import watchtower
import logging
from time import strftime
```
Setup logger before controllers
```
# Configuring Logger to Use CloudWatch
LOGGER = logging.getLogger(__name__)
# Logging levels order: ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < OFF
LOGGER.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
cw_handler = watchtower.CloudWatchLogHandler(log_group='cruddur')
LOGGER.addHandler(console_handler)
LOGGER.addHandler(cw_handler)
LOGGER.info("some message")
```
Add after action for every request
```
@app.after_request
def after_request(response):
    timestamp = strftime('[%Y-%b-%d %H:%M]')
    LOGGER.error('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status)
    return response
```
Add info log in api `/home` as an example
```
LOGGER.info('Hello Cloudwatch! from  /api/activities/home')
```
Set the env var in `docker-compose.yml` or `.env` if you use local development:
```
    AWS_DEFAULT_REGION: "${AWS_DEFAULT_REGION}"
    AWS_ACCESS_KEY_ID: "${AWS_ACCESS_KEY_ID}"
    AWS_SECRET_ACCESS_KEY: "${AWS_SECRET_ACCESS_KEY}"
```
* passing AWS_REGION doesn't seems to get picked up by boto3 so pass default region instead
