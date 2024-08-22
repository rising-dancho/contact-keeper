import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  async function getContacts() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/contacts`,
        contact,
        config
      );
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  }

  // Add Contact
  async function addContact(contact) {
    const config = {
      headers: {
        'Context-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/contacts`,
        contact,
        config
      );
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  }

  // Delete Contact
  function deleteContact(id) {
    dispatch({ type: DELETE_CONTACT, payload: id });
  }

  // Clear Contacts
  function clearContacts() {
    dispatch({ type: CLEAR_CONTACTS });
  }

  // Set Current Contact
  function setCurrent(contact) {
    dispatch({ type: SET_CURRENT, payload: contact });
  }

  // Clear Current Contact
  function clearCurrent() {
    dispatch({ type: CLEAR_CURRENT });
  }

  // Update Contact
  function updateContact(contact) {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  }

  // Filter Contacts
  function filterContacts(text) {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  }

  // Clear Filter
  function clearFilter() {
    dispatch({ type: CLEAR_FILTER, payload: text });
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
