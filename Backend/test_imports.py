import os
import sys

print("Current directory:", os.getcwd())
print("Python path:", sys.path)

try:
    import app
    print("Successfully imported app module")
except ImportError as e:
    print("Failed to import app module:", str(e))

try:
    from app import main
    print("Successfully imported app.main module")
except ImportError as e:
    print("Failed to import app.main module:", str(e))