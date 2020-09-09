import React from 'react'
import PropType from 'prop-types'

const Item = ({
  dietaries,
  id,
  name,
  removeItem,
  selectItem,
}) => {
  return (
    <li key={id} className="item" onClick={selectItem}>
      <h2>{name}</h2>
      <p>
        {dietaries.map((dietary) => (<span key={`${id}-${dietary}`} className="dietary">{dietary}</span>))}
      </p>
      {removeItem && <button className="remove-item" onClick={removeItem}>x</button>}
    </li>
  )
}

Item.propTypes = {
  dietaries: PropType.arrayOf(PropType.string).isRequired,
  id: PropType.number.isRequired,
  name: PropType.string.isRequired,
  removeItem: PropType.func,
  selectItem: PropType.func
}

export default Item
