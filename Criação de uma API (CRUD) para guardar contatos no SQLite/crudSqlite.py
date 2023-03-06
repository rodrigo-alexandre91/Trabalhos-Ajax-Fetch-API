#pip install Flask-SQLAlchemy

from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def dict(self):
       return {"id":self.id, "name":self.name, "phone":self.phone}

with app.app_context():
    db.create_all()


@app.route('/axios.html', methods=['GET'])
def axios():
    return render_template('axious.html')

@app.route('/contacts.html', methods=['GET'])
def datas():
    return render_template('contacts.html')

# GET request to retrieve all contacts
@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify({'contacts':[contact.as_dict() for contact in contacts]}), 200

@app.route('/contacts/<int:id>', methods=['GET'])
def get_contact(id):
    contact = Contact.query.get_or_404(id)
    return jsonify({'contact': contact.as_dict()}),200

# POST request to add a new contact
@app.route('/contacts', methods=['POST'])
def add_contact():
    data = request.get_json()
    if not data or not all(key in data for key in ('name', 'phone')):
        return jsonify({'message': 'Bad request'}), 400

    contact = Contact(name=data['name'], phone=data['phone'])
    db.session.add(contact)
    db.session.commit()
    return jsonify({'contact': contact.as_dict()}), 201

# PUT request to update a contact
@app.route('/contacts/<int:id>', methods=['PUT'])
def update_contact(id):
    data = request.get_json()
    if not data or not all(key in data for key in ('name', 'phone')):
        return jsonify({'message': 'Bad request'}), 400
    contact = Contact.query.get_or_404(id)
    contact.name = data['name']
    contact.phone = data['phone']
    db.session.commit()
    return jsonify({'contact': contact.as_dict()}), 200

# DELETE request to delete a contact
@app.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get_or_404(id)
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Contact has been deleted.'}), 200

if __name__ == '__main__':
    app.run(debug=True)
