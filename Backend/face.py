from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import io
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your pre-trained model
model = tf.keras.models.load_model('finalnewmodel.h5')

# Define your image preprocessing function
def preprocess_image(image):
    # Resize the image to match the input size of your model
    image = image.resize((224, 224))
    # Convert the image to a numpy array
    image_array = np.array(image)
    # Normalize the image data
    image_array = image_array / 255.0
    # Add an extra dimension to the image array to match the input shape of your model
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return "No image found in request", 400

    image = request.files['image'].read()
    image = Image.open(io.BytesIO(image))
    processed_image = preprocess_image(image)

    # Make prediction
    prediction = model.predict(processed_image)
    serverOutput = np.argmax(prediction)
    

    return jsonify({'prediction': str(serverOutput)})


if __name__ == '__main__':
    app.run(port=5050, debug=True)