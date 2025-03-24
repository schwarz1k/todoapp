import PropTypes from 'prop-types'
import './Filterbutton.css'

const Filterbutton = ({ text, isSelected, onClick }) => {
  return (
    <li>
      <button className={isSelected ? 'selected' : ''} onClick={onClick}>
        {text}
      </button>
    </li>
  )
}

Filterbutton.defaultProps = {
  isSelected: false,
}

Filterbutton.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default Filterbutton
