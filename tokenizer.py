from tensorflow.keras.preprocessing.text import Tokenizer

import pandas as pd
import numpy as np

from nltk.corpus import stopwords
import string
import re

import json





def preprocess_text(text):
    # Remove punctuation
    text = text.lower()
    stop_words = set(stopwords.words('english')) - {'no','never','not'}
    
    text = ''.join([char for char in text if char not in string.punctuation])
    # Remove non-alphabetic characters
    text = re.sub('[^a-zA-Z]', ' ', text)
    # Convert to lower case
    text = text.lower()
    text = ' '.join(word for word in text.split() if word not in stop_words)
    return text


def main():

    data = pd.read_csv('/Users/sami/Desktop/Data_emotions/text.csv')
    data['cleaned_text'] = data['text'].apply(preprocess_text)
    data = data[data['cleaned_text'] != ''].reset_index(drop=True)
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(data['cleaned_text'])

    tokenizer_json = tokenizer.to_json()
    with open('tokenizer.json', 'w') as f:
        f.write(tokenizer_json)

if __name__== "main":
    main()
