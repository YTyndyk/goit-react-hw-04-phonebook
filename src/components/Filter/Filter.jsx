import React from 'react';
import PropTypes from 'prop-types';
import css from '../GlobalStyles.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label htmlFor="" className={css.labelFilter}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Find contacts by name"
        placeholder="search"
        required
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;
Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
