// import { Component } from 'react';
import { Container } from './App.styled';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contactsDb from '../db/contacts.json';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', contactsDb);

  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(() => {
      if (
        contacts.some(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        toast.error(`${name} is already in contacts!`);
      }
      return setContacts([contact, ...contacts]);
    });
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizesFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizesFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>

      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
      <ToastContainer autoClose={2000} />
    </Container>
  );
}

// class App extends Component {
//   state = {
//     contacts: contacts,
//     filter: '',
//   };

//   componentDidMount() {
//     const contactsLocStor = localStorage.getItem('contacts');
//     const parsedContactsLocStor = JSON.parse(contactsLocStor);

//     if (parsedContactsLocStor) {
//       this.setState({ contacts: parsedContactsLocStor });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const contactsNew = this.state.contacts;

//     if (contactsNew !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contactsNew));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     this.setState(({ contacts }) => {
//       if (
//         contacts.some(
//           contact => contact.name.toLowerCase() === name.toLowerCase()
//         )
//       ) {
//         return alert(`${name} is already in contacts!`);
//       }
//       return {
//         contacts: [contact, ...contacts],
//       };
//     });
//   };

//   deleteContact = contactId => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizesFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizesFilter)
//     );
//   };

//   render() {
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </Container>
//     );
//   }
// }

// export default App;
