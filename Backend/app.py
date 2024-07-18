from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

# Load the trained model
with open("finalmodel.pkl", "rb") as file:
    model = pickle.load(file)

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['GET'])
def predict():
    print('i am in predict route')
    # Get the answers from the GET request
    answers = []
    for i in range(1, 11):
        value = request.args.get(f'answer{i}')
        print(f'value for {i} is {value}')
        if value.isdigit():
            answers.append(int(value))
            
        
    print('answers=',answers)

    age = float(request.args.get('answer11'))  # Ensure age is a float
    gender = request.args.get('answer12')
    ethnicity = request.args.get('answer13')
    jaundice = request.args.get('answer14')
    family_autism = request.args.get('answer15')
    test_completed_by = request.args.get('answer16')

    # Create a DataFrame from the answers
    df = pd.DataFrame([answers], columns=["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"])
    df['Age'] = age
    df['Gender'] = gender
    df['Ethnicity'] = ethnicity
    df['Jaundice'] = jaundice
    df['Family_mem_with_ASD'] = family_autism
    df['Who_completed_the_test'] = test_completed_by

    print('Dataframe is', df)

    categorical_features = ["Gender", "Ethnicity", "Jaundice", "Family_mem_with_ASD", "Who_completed_the_test"]
    numeric_features = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "Age"]
    numeric_transformer = SimpleImputer(strategy='mean')
    categorical_transformer = OneHotEncoder(handle_unknown='error')
    preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)],
    remainder='passthrough')  # Pass through any other columns not specified
    

    # Preprocess the data
    X = df[["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "Age", "Gender", "Ethnicity", "Jaundice", "Family_mem_with_ASD", "Who_completed_the_test"]]
    X_imputed = preprocessor.fit_transform(X)

    # Make predictions
    output = model.predict(X_imputed)

    # Return the prediction
    return jsonify({'output': str(output[0])})
    

if __name__ == '__main__':
    app.run(port=5010, debug=True)