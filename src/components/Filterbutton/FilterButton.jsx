import PropTypes from 'prop-types'
import './FilterButton.css'

const FilterButton = ({ text, isSelected, onClick }) => {
  return (
    <li>
      <button className={isSelected ? 'selected' : ''} onClick={onClick}>
        {text}
      </button>
    </li>
  )
}

FilterButton.defaultProps = {
  isSelected: false,
}

FilterButton.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default FilterButton
