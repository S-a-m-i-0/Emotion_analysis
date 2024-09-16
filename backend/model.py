from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.models import load_model


import numpy as np
from nltk.corpus import stopwords
import string
import re

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





def predict_emotion(model, token):
        while True:
            user_input = input("Enter your text (or type 'exit' to quit): ")
        
            if user_input.lower() == 'exit':
                print("Quiting")
                break
    
            inp = preprocess_text(user_input)
            print(inp)
            input_sequence = token.texts_to_sequences([inp])
           
            user = pad_sequences(input_sequence, maxlen=maximum_length)
            
            prediction = model.predict(user)
            predicted_value = np.argmax(prediction, axis=-1)[0]
            predicted_emotion = emotion_categories[predicted_value]
            
            print(f"Predicted Emotion: {predicted_emotion}\n")

def main():
    loaded_model = load_model('my_emotion_model.keras')  
    loaded_model.summary()




    # Load the tokenizer JSON from a file
    with open('tokenizer.json', 'r') as f:
        tokenizer_json = f.read()

    # Reconstruct the tokenizer
    token = tokenizer_from_json(tokenizer_json)


    maximum_length = 82
    emotion_categories = {0: 'sadness', 1: 'joy', 2: 'love', 3: 'anger', 4: 'fear', 5: 'surprise'}
    predict_emotion(loaded_model,token)

if __name__== "main":
    main()