import PropTypes from 'prop-types';
import css from './contact-list.module.scss';

const ContactList = ({ contacts, onDeleteNumber }) => {
  const elements = contacts.map(({ id, name, number }) => (
    <li className={css.listItem} key={id}>
      {name}: {number}{' '}
      <button className={css.btn} onClick={() => onDeleteNumber(id)}>
        delete
      </button>
    </li>
  ));

  return <ol className={css.list}>{elements}</ol>;
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteNumber: PropTypes.func,
};
