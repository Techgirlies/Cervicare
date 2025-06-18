import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# -------------------------------
# 1. Load and Clean the Dataset
# -------------------------------

# Load data
df = pd.read_csv("cervical-cancer_csv.csv")

print(f"Initial data shape: {df.shape}")
print(df.info())

# Replace '?' with NaN
df.replace('?', np.nan, inplace=True)

# -------------------------------
# 2. Separate features and target
# -------------------------------

X = df.drop(columns=["Biopsy"])
y = df["Biopsy"].astype(int)  # Ensure target is int

# -------------------------------
# 3. Identify categorical and numerical columns
# -------------------------------

categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()

print("Categorical columns:", categorical_cols)
print("Numerical columns:", numerical_cols)

# -------------------------------
# 4. Preprocessing pipeline
# -------------------------------

numerical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer([
    ('num', numerical_pipeline, numerical_cols),
    ('cat', categorical_pipeline, categorical_cols)
])

# -------------------------------
# 5. Create modeling pipeline
# -------------------------------

model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')

pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', model)
])

# -------------------------------
# 6. Train-Test split
# -------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# -------------------------------
# 7. Cross-validation
# -------------------------------

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

cv_scores = cross_val_score(pipeline, X_train, y_train, cv=cv, scoring='roc_auc')
print(f"Cross-validation AUC scores: {cv_scores}")
print(f"Mean CV AUC: {cv_scores.mean():.4f}")

# -------------------------------
# 8. Train on full train set
# -------------------------------

pipeline.fit(X_train, y_train)

# -------------------------------
# 9. Evaluate on test set
# -------------------------------

y_pred = pipeline.predict(X_test)
y_proba = pipeline.predict_proba(X_test)[:, 1]

print("\nTest Set Evaluation Metrics:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("AUC Score:", roc_auc_score(y_test, y_proba))
print(classification_report(y_test, y_pred))

# -------------------------------
# 10. Save model and feature info
# -------------------------------

pickle.dump(pipeline, open("cervical_cancer_pipeline.pkl", "wb"))

# -------------------------------
# 11. Helper function to prepare input data before prediction
# -------------------------------

def prepare_input(sample_data):
    df = pd.DataFrame(sample_data, columns=X.columns)
    for col in categorical_cols:
        df[col] = df[col].astype(str)
    for col in numerical_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    return df

# -------------------------------
# 12. Load and predict function with input preparation
# -------------------------------

def predict_risk(input_data):
    if isinstance(input_data, (list, np.ndarray)):
        input_df = prepare_input(input_data)
    elif isinstance(input_data, pd.DataFrame):
        input_df = input_data.copy()
        # Ensure dtypes in case DataFrame is passed directly
        for col in categorical_cols:
            input_df[col] = input_df[col].astype(str)
        for col in numerical_cols:
            input_df[col] = pd.to_numeric(input_df[col], errors='coerce')
    else:
        raise ValueError("Input data should be list, ndarray, or DataFrame")

    risk = pipeline.predict_proba(input_df)[:, 1][0] * 100
    return round(risk, 2)

# -------------------------------
# 13. Example prediction
# -------------------------------
sample_data = [
    [25, '2', '18', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 0, 'NaN', 'NaN', 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [30, '1', '16', '2', '1', '5', '0.5', '1', '3', '1', '2', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 1, '12', '2', 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [22, '3', '17', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 0, 'NaN', 'NaN', 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

try:
    risk = predict_risk(sample_data)
    print(f"\nPredicted risk for sample data: {risk}%")
except Exception as e:
    print("Error:", e)
