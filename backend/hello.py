from tensorflow.keras.models import load_model

# Load the model from the .keras or .h5 file
loaded_model = load_model('my_emotion_model.keras')  # or 'my_emotion_model.h5'
loaded_model.summary()
