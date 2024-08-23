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
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/contacts`
      );
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.message });
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
      dispatch({ type: CONTACT_ERROR, payload: error.message });
    }
  }

  // Delete Contact
  async function deleteContact(_id) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/contacts/${_id}`
      );
      dispatch({ type: DELETE_CONTACT, payload: _id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.message });
    }
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
  async function updateContact(contact) {
    const { _id } = contact;
    const config = {
      headers: {
        'Context-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/contacts/${_id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.message });
    }
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
