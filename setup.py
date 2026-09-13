import argparse
import shutil
import subprocess
import sys
import venv
from pathlib import Path


def run(cmd, **kwargs):
    print(f"$ {' '.join(cmd)}")
    subprocess.run(cmd, check=True, **kwargs)


def _venv(venv_dir: Path) -> Path:
    python_bin = venv_dir / ("Scripts" if sys.platform == "win32" else "bin") / (
        "python.exe" if sys.platform == "win32" else "python"
    )

    if venv_dir.exists() and python_bin.exists():
        print(f"Skipping, venv already exists at '{venv_dir}'")
    else:
        print(f"Creating venv at '{venv_dir}'")
        venv.EnvBuilder(with_pip=True).create(venv_dir)

    return python_bin

def _python_package(python_bin: Path, requirements_file: Path):
    if not requirements_file.exists():
        print(f"'{requirements_file}' not found, skipping Python package install")
        return

    print(f"Installing Python packages from '{requirements_file}'")
    run([str(python_bin), "-m", "pip", "install", "--upgrade", "pip"])
    run([str(python_bin), "-m", "pip", "install", "-r", str(requirements_file)])

def _node_packages(package_json: Path):
    node_path = shutil.which("node")
    npm_path = shutil.which("npm")

    if not node_path or not npm_path:
        print(
            "[error] Node.js/npm is not installed or not on PATH.\n"
            "        Install Node.js from https://nodejs.org/ (or via your "
            "package manager) and re-run this script.",
            file=sys.stderr,
        )
        sys.exit(1)

    result = subprocess.run([node_path, "--version"], capture_output=True, text=True)
    print(f"Found Node.js {result.stdout.strip()} at {node_path}")

    if not package_json.exists():
        print(f"'{package_json}' not found, skipping npm install")
        return

    print(f"Installing npm packages from '{package_json}'")
    run([npm_path, "install"], cwd=str(package_json.parent))

def main():
    parser = argparse.ArgumentParser(description="Idempotent project setup.")
    parser.add_argument("--venv-dir", default=".venv", help="Virtual environment directory (default: .venv)")
    parser.add_argument("--requirements", default="requirements.txt", help="Path to requirements.txt")
    parser.add_argument("--package-json", default="package.json", help="Path to package.json")
    parser.add_argument("--skip-node", action="store_true", help="Skip the Node.js/npm step entirely")
    args = parser.parse_args()

    venv_dir = Path(args.venv_dir)
    requirements_file = Path(args.requirements)
    package_json = Path(args.package_json)

    python_bin = _venv(venv_dir)
    _python_package(python_bin, requirements_file)

    if not args.skip_node:
        _node_packages(package_json)

    print("\n[done] Setup complete.")
    activate_hint = (
        f"{venv_dir}\\Scripts\\activate" if sys.platform == "win32" else f"source {venv_dir}/bin/activate"
    )
    print(f"Activate the venv with: {activate_hint}")


if __name__ == "__main__":
    main()