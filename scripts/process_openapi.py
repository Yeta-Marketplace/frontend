import json
from pathlib import Path
import requests


file_path = Path("./openapi.json")

# Load openapi.json
print('Downloading openapi.json ...')
r = requests.get('http://localhost:8123/openapi.json')
file_path.write_text(json.dumps(r.json())) 

print(' ✅ ')

print('Simplifying openapi.json ...')

# Simplify openapi.json
openapi_content = json.loads(file_path.read_text())

for path_data in openapi_content["paths"].values():
    for operation in path_data.values():
        tag = operation["tags"][0]
        operation_id = operation["operationId"]
        to_remove = f"{tag}-"
        new_operation_id = operation_id[len(to_remove) :]
        operation["operationId"] = new_operation_id

file_path.write_text(json.dumps(openapi_content))

print(' ✅ ')