import { useState } from 'react';
import ContactsList from './ContactsList';
import Form from './ContactsForm';
import Filter from './Filter';
import css from './GlobalStyles.module.css';
import innitialContacts from '../../src/contacts.json';
import useLocalStorage from 'Hooks/useLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', innitialContacts);
  console.log(contacts);
  const [filter, setFilter] = useState('');

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const addContact = newContact => {
    console.log(newContact);
    contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().trim() ===
          newContact.dataName.toLowerCase().trim() ||
        number.trim() === newContact.dataNumber.trim()
    )
      ? alert(`${newContact.dataName}: is already in contacts`)
      : setContacts(contacts => [{ ...newContact }, ...contacts]);
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
// export class App extends Component {
//   state = {
//     contacts,
//     filter: '',
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   addContact = newContact => {
//     this.state.contacts.filter(
//       contact =>
//         contact.name.toLowerCase().trim() ===
//           newContact.name.toLowerCase().trim() ||
//         contact.number.trim() === newContact.number.trim()
//     ).length
//       ? alert(`${newContact.name}: is already in contacts`)
//       : this.setState(prevState => {
//           return {
//             contacts: [newContact, ...prevState.contacts],
//           };
//         });
//   };
//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value.toLowerCase() });
//   };
//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);

//     if (parseContacts) {
//       this.setState({ contacts: parseContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <div
//         style={{
//           height: '100vh',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 16,
//           color: '#010101',
//         }}
//       >
//         <h1 className={css.title}>Phonebook</h1>
//         <Form onSubmit={this.addContact} />
//         <h2 className={css.title}>Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactsList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
