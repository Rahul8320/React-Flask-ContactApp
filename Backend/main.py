from flask import request, jsonify
from config import app, db
from models import Contact

# get all contacts
@app.route("/contacts", methods = ["GET"])
def get_contacts():
    contacts = Contact.query.order_by(Contact.first_name, Contact.last_name).all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

# get contact by id
@app.route("/contact/<int:id>", methods=["GET"])
def get_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"message": "Contact not found!"}), 404
    
    json_contact = contact.to_json()

    return jsonify({"contact": json_contact})

# create new contact
@app.route("/create-contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    phone_number = request.json.get("phoneNumber")
    avatar = request.json.get("avatar")

    if not first_name or not last_name or not email or not phone_number:
        return jsonify({"message": "All fields are required!"}), 422

    new_contact = Contact(first_name = first_name, 
                          last_name = last_name, 
                          email = email, 
                          phone_number = phone_number, 
                          avatar = avatar)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Contact created successfully."}), 201

# update existing contact
@app.route("/update-contact/<int:id>", methods=["PUT"])
def update_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"message": "Contact not found!"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.phone_number = data.get("phoneNumber", contact.phone_number)
    contact.avatar = data.get("avatar", contact.avatar)

    db.session.commit()

    return jsonify({"message": "Contact updated successfully."})

# delete existing contact
@app.route("/delete-contact/<int:id>", methods=["DELETE"])
def delete_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"message": "Contact not found!"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "Contact deleted successfully."})



if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)