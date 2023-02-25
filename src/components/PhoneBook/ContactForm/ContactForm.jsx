import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './contact-form.module.scss';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const inputNameRef = useRef();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const handleChange = e => {
    setState(prevState => {
      const { name, value } = e.target;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });

    reset();
  };

  const reset = () => {
    setState({ name: '', number: '' });
  };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label className={css.label}>Name:</label>
        <input
          ref={inputNameRef}
          value={name}
          onChange={handleChange}
          className={css.textField}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="enter contact name"
        />
      </div>
      <div className={css.formGroup}>
        <label className={css.label}>Number:</label>
        <input
          value={number}
          onChange={handleChange}
          className={css.textField}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="enter phone number"
        />
      </div>
      <button className={css.btn} type="submit">
        add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
