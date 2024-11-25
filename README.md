
![Demo of Emotion Analysis](https://github.com/S-a-m-i-0/Emotion_analysis/blob/main/templates/Leo_AI.gif)
# Emotion Analysis Model

This project is a machine learning-based Emotion Analysis Model designed to classify text into six predefined emotions: **sadness**, **joy**, **love**, **anger**, **fear**, and **surprise**. It uses a deep learning model built with TensorFlow and Keras, leveraging an LSTM-based architecture to capture sequential patterns in text.

## Features
- Classifies text into six emotion categories.
- Handles imbalanced datasets using class weighting.
- Provides a user-friendly interactive prediction interface.
- Achieves high accuracy and robust performance on a real-world dataset.

## Table of Contents
- [Model Architecture](#model-architecture)
- [Dataset](#dataset)
- [Results](#results)
- [Setup and Usage](#setup-and-usage)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Training the Model](#training-the-model)
  - [Using the Pretrained Model](#using-the-pretrained-model)
  - [Interactive Prediction](#interactive-prediction)
- [Contribution](#contribution)
- [Acknowledgments](#acknowledgments)

## Model Architecture
The model uses a sequential architecture:
1. **Embedding Layer**: Converts words into dense vector representations.
2. **LSTM Layers**: Two stacked LSTM layers to capture temporal dependencies.
3. **Dropout Layers**: Prevents overfitting.
4. **Dense Layer**: Outputs probability distribution across the emotion classes.

### Key Model Details:
- Framework: TensorFlow/Keras
- Loss Function: Categorical Cross-Entropy
- Optimizer: Adam
- Metrics: Accuracy
- Maximum Sequence Length: 82
- Training Epochs: 3

## Dataset
- used dataset from Kaggle containing 500,000 plus value-labled pair to train the model
- Preprocessed to remove noise, punctuation, and stopwords.
- Tokenized and padded sequences for uniformity.
- Labels are one-hot encoded for six emotion categories.

## Results
- Training Accuracy: **94.11%**
- Validation Accuracy: **93.77%**
- Test Accuracy: **93.92%**

## Setup and Usage

### Prerequisites
- Python 3.7 or higher
- TensorFlow 2.x
- Required libraries: `numpy`, `pandas`, `sklearn`

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/emotion-analysis-model.git



Video Demo: https://drive.google.com/file/d/1wYE-fptvtKGxKqfQyUf8a8tKMBp7OoDL/view?usp=sharing
