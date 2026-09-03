import subprocess
import signal
import sys
from pathlib import Path


processes = []

ENDPOINT_FILE = Path("src/app/config/endpoint.ts")

DEFAULT_ENDPOINT = '/api'
LOCAL_ENDPOINT = 'http://localhost:8000'


def _local_endpoint():
    """Change the frontend API endpoint to the local backend."""
    content = ENDPOINT_FILE.read_text()

    content = content.replace(
        f'const API_ENDPOINT = "{DEFAULT_ENDPOINT}";',
        f'const API_ENDPOINT = "{LOCAL_ENDPOINT}";'
    )

    ENDPOINT_FILE.write_text(content)


def _restore_endpoint():
    """Restore the endpoint used for Vercel/production."""
    content = ENDPOINT_FILE.read_text()

    content = content.replace(
        f'const API_ENDPOINT = "{LOCAL_ENDPOINT}";',
        f'const API_ENDPOINT = "{DEFAULT_ENDPOINT}";'
    )

    ENDPOINT_FILE.write_text(content)


def stop():
    print("\nStopping development servers...")

    for process in processes:
        if process.poll() is None:
            process.terminate()

    for process in processes:
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()

    _restore_endpoint()


def signal_handler(sig, frame):
    stop()
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


try:
    _local_endpoint()

    backend = subprocess.Popen(
        ["uvicorn", "api.index:app", "--reload"]
    )
    processes.append(backend)

    frontend = subprocess.Popen(
        ["npm", "run", "dev"]
    )
    processes.append(frontend)

    print()
    print("Development servers started!")
    print()
    print("Frontend:  http://localhost:3000")
    print("Backend:   http://localhost:8000")
    print("API Docs:  http://localhost:8000/docs")
    print()
    print("Press Ctrl+C to stop both servers.")

    while True:
        if backend.poll() is not None:
            print("Backend process stopped.")
            break

        if frontend.poll() is not None:
            print("Frontend process stopped.")
            break

except KeyboardInterrupt:
    pass

finally:
    stop()