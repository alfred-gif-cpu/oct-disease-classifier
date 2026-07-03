"""
One-shot deployer for pushing this project to a Hugging Face Space.

Usage (from an activated venv):
    pip install huggingface_hub
    set HF_TOKEN=hf_xxx                       (PowerShell: $env:HF_TOKEN="hf_xxx")
    set HF_SPACE_ID=your-username/oct-disease-classifier
    python deploy_hf.py

Get a WRITE token at: https://huggingface.co/settings/tokens
"""
import os
from huggingface_hub import HfApi

REPO_ID = os.environ.get("HF_SPACE_ID")
TOKEN = os.environ.get("HF_TOKEN")

if not REPO_ID or not TOKEN:
    raise SystemExit(
        "Set both env vars first:\n"
        '  $env:HF_SPACE_ID="your-username/oct-disease-classifier"\n'
        '  $env:HF_TOKEN="hf_xxx"   (a WRITE token from huggingface.co/settings/tokens)'
    )

api = HfApi(token=TOKEN)

print(f"Creating (or reusing) Space: {REPO_ID}")
api.create_repo(
    repo_id=REPO_ID,
    repo_type="space",
    space_sdk="docker",
    exist_ok=True,
)

print("Uploading files (large models go over LFS automatically)...")
api.upload_folder(
    folder_path=".",
    repo_id=REPO_ID,
    repo_type="space",
    # These are NOT read from .gitignore, so models/ is included on purpose.
    ignore_patterns=[
        "venv/*",
        ".git/*",
        ".claude/*",
        "__pycache__/*",
        "*/__pycache__/*",
        "*.pyc",
        "*.log",
    ],
)

print(f"\nDone! Your Space is building at:\n  https://huggingface.co/spaces/{REPO_ID}")
print("The first build takes a few minutes (installing TensorFlow). Watch the 'Logs' tab.")
