import React from 'react';
import PropType from 'prop-types'

import Item from  './Item'

const Sidebar = ({
  addItemToMenu,
  items,
  onChange,
  searchTerm
}) => {

  return (
    <div className="col-4">
      <div className="filters">
        <input
          className="form-control"
          placeholder="Name"
          onChange={(event) => onChange(event.target.value)}
          type="text"
          defaultValue={searchTerm}
        />
      </div>
      <ul className="item-picker">
        {items.length ? items.map(({dietaries, id, name}) => (
          <Item
            key={`sidebar-${id}`}
            dietaries={dietaries}
            id={id}
            name={name}
            selectItem={() => addItemToMenu(id)}
          />
        )) : <p>Zilch, zip, nada!</p>}
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  addItemToMenu: PropType.func.isRequired,
  items: PropType.arrayOf(PropType.shape({
    dietaries: PropType.arrayOf(PropType.string).isRequired,
    id: PropType.number.isRequired,
    name: PropType.string.isRequired,
  })).isRequired,
  onChange: PropType.func.isRequired,
  searchTerm: PropType.string.isRequired,
}

export default Sidebar
