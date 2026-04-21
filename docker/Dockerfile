# GoalieAI - Complete Prototype Docker Setup

FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir \
    opencv-python==4.8.1.78 \
    mediapipe==0.10.9 \
    numpy==1.26.2

WORKDIR /app

# Copy analyzer
COPY goalie-analyzer/ /app/analyzer/

# Default command runs analyzer on a video
CMD ["python3", "/app/analyzer/analyzer.py", "/data/input.mp4"]