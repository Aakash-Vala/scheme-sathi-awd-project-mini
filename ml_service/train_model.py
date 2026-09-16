import os
import json
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, roc_auc_score, classification_report

np.random.seed(42)

def generate_synthetic_data(num_samples=3500):
    ages = np.random.randint(18, 65, size=num_samples)
    genders = np.random.choice(['Female', 'Male', 'Other'], size=num_samples, p=[0.45, 0.50, 0.05])
    castes = np.random.choice(['SC', 'ST', 'OBC', 'General', 'EWS'], size=num_samples, p=[0.35, 0.20, 0.25, 0.10, 0.10])
    
    annual_incomes = np.random.choice([
        np.random.randint(40000, 150000),
        np.random.randint(150000, 350000),
        np.random.randint(350000, 700000),
        np.random.randint(700000, 1500000)
    ], size=num_samples, p=[0.30, 0.40, 0.20, 0.10])
    
    loan_amounts = np.random.choice([
        np.random.randint(25000, 150000),
        np.random.randint(150000, 500000),
        np.random.randint(500000, 1500000),
        np.random.randint(1500000, 3500000)
    ], size=num_samples, p=[0.35, 0.35, 0.20, 0.10])
    
    credit_scores = np.random.randint(450, 850, size=num_samples)
    prior_defaults = np.random.choice([0, 1], size=num_samples, p=[0.88, 0.12])
    has_business_plan = np.random.choice([0, 1], size=num_samples, p=[0.25, 0.75])
    experience_years = np.random.randint(0, 20, size=num_samples)

    labels = []
    for i in range(num_samples):
        score = 0.0
        income = annual_incomes[i]
        loan = loan_amounts[i]
        cscore = credit_scores[i]
        pdef = prior_defaults[i]
        bplan = has_business_plan[i]
        caste = castes[i]
        gender = genders[i]
        exp = experience_years[i]

        dti = loan / (income * 3.5 + 10000)

        # Statutory government criteria weights
        if caste in ['SC', 'ST']:
            score += 0.25
        elif caste in ['OBC', 'EWS']:
            score += 0.15

        if gender == 'Female':
            score += 0.15

        if income <= 300000:
            score += 0.20
        elif income <= 500000:
            score += 0.10
        elif income > 1000000:
            score -= 0.10

        if cscore >= 750:
            score += 0.25
        elif cscore >= 650:
            score += 0.15
        elif cscore < 550:
            score -= 0.25

        if pdef == 1:
            score -= 0.40

        if bplan == 1:
            score += 0.15

        if exp >= 3:
            score += 0.10

        if dti < 0.6:
            score += 0.15
        elif dti > 1.2:
            score -= 0.25

        # Add small realistic noise
        noise = np.random.normal(0, 0.08)
        final_score = score + noise

        # Probability threshold
        labels.append(1 if final_score >= 0.45 else 0)

    df = pd.DataFrame({
        'age': ages,
        'gender': genders,
        'caste': castes,
        'annual_income': annual_incomes,
        'loan_amount': loan_amounts,
        'credit_score': credit_scores,
        'prior_default': prior_defaults,
        'has_business_plan': has_business_plan,
        'experience_years': experience_years,
        'approved': labels
    })
    return df

def train_and_save():
    print("Generating training dataset...")
    df = generate_synthetic_data(4000)

    gender_map = {'Female': 0, 'Male': 1, 'Other': 2}
    caste_map = {'SC': 0, 'ST': 1, 'OBC': 2, 'EWS': 3, 'General': 4}

    df['gender_encoded'] = df['gender'].map(gender_map)
    df['caste_encoded'] = df['caste'].map(caste_map)
    df['dti_ratio'] = df['loan_amount'] / (df['annual_income'] * 3.5 + 10000)

    features = [
        'age', 'gender_encoded', 'caste_encoded', 'annual_income',
        'loan_amount', 'credit_score', 'prior_default',
        'has_business_plan', 'experience_years', 'dti_ratio'
    ]

    X = df[features]
    y = df['approved']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    print("Training RandomForestClassifier...")
    clf = RandomForestClassifier(n_estimators=120, max_depth=10, random_state=42)
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)
    probs = clf.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, preds)
    roc = roc_auc_score(y_test, probs)

    print(f"Model Training Complete!")
    print(f"Accuracy: {acc:.4f}")
    print(f"ROC-AUC: {roc:.4f}")
    print("\nClassification Report:\n", classification_report(y_test, preds))

    os.makedirs('models', exist_ok=True)
    with open('models/model.pkl', 'wb') as f:
        pickle.dump(clf, f)

    meta = {
        'features': features,
        'gender_map': gender_map,
        'caste_map': caste_map,
        'accuracy': round(float(acc), 4),
        'roc_auc': round(float(roc), 4)
    }

    with open('models/metadata.json', 'w') as f:
        json.dump(meta, f, indent=2)

    print("Model and metadata successfully saved in ml_service/models/")

if __name__ == '__main__':
    train_and_save()
