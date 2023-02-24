import { nanoid } from 'nanoid';
import { Component } from 'react';
import PhoneBlock from './PhoneBlock/PhoneBlock';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import css from './phone-book.module.scss';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('book-contacts'));

    if (contacts?.length) {
      //contacts && contacts.length
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length) {
      localStorage.setItem('book-contacts', JSON.stringify(contacts));
    }
  }

  onAddContacts = ({ name, number }) => {
    if (this.isDublicate({ name, number })) {
      return alert(`${name} ${number} is already in contacts`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newPhone = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [...contacts, newPhone] };
    });
  };

  onDeleteNumber = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(item => item.id !== id);
      return {
        contacts: newContacts,
      };
    });
  };

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName &&
        contact.number === number
      );
    });

    return Boolean(dublicate);
  }

  getFilteredNumbers() {
    const { contacts, filter } = this.state;

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
  }

  handleFilterChange = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  render() {
    const { onAddContacts, onDeleteNumber } = this;
    const contacts = this.getFilteredNumbers();

    return (
      <div className={css.wrapper}>
        <h2 className={css.title}>My Phonebook</h2>
        <PhoneBlock title="Phonebook">
          <ContactForm onSubmit={onAddContacts} />
        </PhoneBlock>
        <PhoneBlock title="Contacts">
          <label className={css.label}>Find contacts by name:</label>
          <input
            onChange={this.handleFilterChange}
            className={css.textField}
            name="filter"
            value={this.state.filter}
          />
          <ContactList contacts={contacts} onDeleteNumber={onDeleteNumber} />
        </PhoneBlock>
      </div>
    );
  }
}

export default PhoneBook;
