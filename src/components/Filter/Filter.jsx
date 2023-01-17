import PropTypes from 'prop-types';
import { Label, InputFilter } from './Filter.styled';

const Filter = ({ value, onChange }) => {
  return (
    <Label htmlFor="filter">
      Find contacts by name
      <InputFilter type="text" value={value} onChange={onChange} />
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
