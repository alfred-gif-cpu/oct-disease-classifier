FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONIOENCODING=utf-8 \
    TF_CPP_MIN_LOG_LEVEL=2

# System libraries needed by OpenCV (headless) and scikit-image/scipy
RUN apt-get update && apt-get install -y --no-install-recommends \
        libglib2.0-0 \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Run as a non-root user (Hugging Face Spaces recommendation)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR /home/user/app

# Install Python dependencies first for better build-layer caching
COPY --chown=user requirements-hf.txt ./requirements-hf.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements-hf.txt

# Copy the rest of the application (app.py, models/, templates/, static/, src/)
COPY --chown=user . .

# Hugging Face Spaces routes traffic to this port
EXPOSE 7860

# One worker keeps a single copy of the model in memory; long timeout covers
# the cold model-load + CPU inference.
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "1", "--threads", "4", "--timeout", "300", "app:app"]
