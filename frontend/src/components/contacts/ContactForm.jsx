import { useState } from 'react';
import contactContext from '../context/contact/contactContext';

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  function onChange(e) {
    return setContact({ ...contact, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    contactContext.addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary"> Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        id="personal"
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
        style={{ marginRight: '8px' }}
      />
      <label htmlFor="personal" style={{ marginRight: '15px' }}>
        Personal
      </label>
      <input
        id="professional"
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />
      <label htmlFor="professional"> Professional</label>
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
