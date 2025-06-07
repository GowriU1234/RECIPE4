from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    ingredients = data.get("ingredients", "")

    if not ingredients:
        return jsonify({"recipe": "Please provide some ingredients."}), 400

    prompt = f"Give me a detailed recipe using these ingredients: {ingredients}"

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        recipe = response["choices"][0]["message"]["content"]
        return jsonify({"recipe": recipe})
    except Exception as e:
        return jsonify({"recipe": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
