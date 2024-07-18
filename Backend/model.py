import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
import pickle
from sklearn.preprocessing import OrdinalEncoder


# Load the csv file - Ensure the path is correct
df = pd.read_csv("Autism_dataset_16col.csv")
print(df.columns)

# Select independent and dependent variable
X = df[["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "Age", "Gender", "Ethnicity", "Jaundice", "Family_mem_with_ASD", "Who_completed_the_test"]]
y = df["ASD_RESULT"]

# Drop rows with missing values in both X and y
df_cleaned = df.dropna(subset=["ASD_RESULT"])

print("This is df cleaned", df_cleaned.head())
X = df_cleaned[["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "Age", "Gender", "Ethnicity", "Jaundice", "Family_mem_with_ASD", "Who_completed_the_test"]]
y = df_cleaned["ASD_RESULT"]

# Reset the index of y after dropping missing values
y = y.reset_index(drop=True)
print(" y print", y)

# Define column transformer to handle categorical columns
categorical_features = ["Gender", "Ethnicity", "Jaundice", "Family_mem_with_ASD", "Who_completed_the_test"]
numeric_features = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "Age"]
numeric_transformer = SimpleImputer(strategy='mean')
categorical_transformer = OrdinalEncoder()
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)],
    remainder='passthrough')  # Pass through any other columns not specified

# Preprocess the data
X_imputed = preprocessor.fit_transform(X)

print('array size is', len(X_imputed[0]))
print('x is ', X.head())
print('x_imputed is ', X_imputed)

# Check if there are any features present in the dataset after imputation
if X_imputed.shape[1] == 0:
    print("Error: No features present in the dataset after imputation")
else:
    # Split the dataset into train and test
    X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.3, random_state=50)

    # Instantiate the model
    classifier = RandomForestClassifier()

    # Fit the model
    classifier.fit(X_train, y_train)

    # Make pickle file of our model
    pickle.dump(classifier, open("finalmodel.pkl", "wb"))

    