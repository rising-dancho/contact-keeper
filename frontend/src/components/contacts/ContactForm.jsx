import { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const initialContact = {
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  };
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [ current]);

  const [contact, setContact] = useState(initialContact);

  const { name, email, phone, type } = contact;

  function onChange(e) {
    return setContact({ ...contact, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      setContact(initialContact);
    }
  }

  function clearAll() {
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current === null ? 'Add Contact' : 'Edit Contact'}
      </h2>
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
          value={current === null ? 'Add Contact' : 'Update Contact'}
          className="btn btn-primary btn-block"
        />
      </div>

      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
