import PropTypes from 'prop-types';
import css from './phone-block.module.scss';

const PhoneBlock = ({ title, children }) => {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>{title}</h3>
      {children}
    </div>
  );
};

export default PhoneBlock;

PhoneBlock.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
