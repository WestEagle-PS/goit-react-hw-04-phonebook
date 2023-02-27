import { nanoid } from 'nanoid';
import { useState, useEffect, useRef, useCallback } from 'react';
import PhoneBlock from './PhoneBlock/PhoneBlock';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import css from './phone-book.module.scss';

const PhoneBook = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('book-contacts'));
    return contacts?.length ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    localStorage.setItem('book-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContacts = useCallback(({ name, number }) => {
    if (isDublicate({ name, number })) {
      return alert(`${name} ${number} is already in contacts`);
    }

    setContacts(prevContacts => {
      const newPhone = {
        id: nanoid(),
        name,
        number,
      };

      return [...prevContacts, newPhone];
    });
  }, []);

  const onDeleteNumber = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName &&
        contact.number === number
      );
    });

    return Boolean(dublicate);
  };

  const getFilteredNumbers = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) || number.includes(filter)
      );
    });

    return result;
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const contactsFiltered = getFilteredNumbers();

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>My Phonebook</h2>
      <PhoneBlock title="Phonebook">
        <ContactForm onSubmit={onAddContacts} />
      </PhoneBlock>
      <PhoneBlock title="Contacts">
        <label className={css.label}>Find contacts by name:</label>
        <input
          onChange={handleFilterChange}
          className={css.textField}
          name="filter"
          value={filter}
        />
        <ContactList
          contacts={contactsFiltered}
          onDeleteNumber={onDeleteNumber}
        />
      </PhoneBlock>
    </div>
  );
};

export default PhoneBook;
