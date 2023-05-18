import { useState } from 'react';
import ContactsList from './ContactsList';
import Form from './ContactsForm';
import Filter from './Filter';
import css from './GlobalStyles.module.css';
import innitialContacts from '../../src/contacts.json';
import useLocalStorage from 'Hooks/useLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', innitialContacts);
  const [filter, setFilter] = useState('');

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };
  const addContact = newContact => {
    const existedContact = contacts.some(
      contact =>
        contact.name === newContact.name || contact.number === newContact.number
    );
    if (existedContact) {
      return alert(`${newContact.name}: is already in contacts`);
    }
    setContacts([newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        color: '#010101',
      }}
    >
      <h1 className={css.title}>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        contacts={visibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
export default App;
