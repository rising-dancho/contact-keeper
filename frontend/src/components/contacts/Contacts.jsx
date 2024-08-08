import React, { useContext } from 'react';
import ContactContext from '../context/contact/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;
  return (
    <>
      {contacts.map((contact) => {
        return <h3>{contact.name}</h3>;
      })}
    </>
  );
};

export default Contacts;
