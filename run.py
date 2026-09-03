import subprocess
import signal
import sys


processes = []


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


def signal_handler(sig, frame):
    stop()
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


try:
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