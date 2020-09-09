import React from 'react';
import PropType from 'prop-types'

//  fugly :)
const calculateDiataryRequirementCounts = (menuItems) => {
  return menuItems.reduce((acc, item) => {
    item.dietaries.forEach((dietary) => {
      acc.hasOwnProperty(dietary) ? acc[dietary]++ : acc[dietary] = 1
    });
    return acc;
  }, {})
}

const Summary = ({
  menuItems,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 menu-summary-left">
          <span>{menuItems.length} item{menuItems.length !== 1 ? 's' : ''} </span>
        </div>
        <div className="col-6 menu-summary-right">
          {
            Object.entries(calculateDiataryRequirementCounts(menuItems)).map(([key, value]) => {
              return (<span key={`summary-${key}`}>{value}x <span className="dietary" >{key}</span></span>)
            })
          }
        </div>
      </div>
    </div>
  )
}

Summary.propTypes = {
  menuItems: PropType.arrayOf(PropType.shape({
    dietaries: PropType.arrayOf(PropType.string).isRequired,
    id: PropType.number.isRequired,
    name: PropType.string.isRequired,
  })).isRequired,
}

export default Summary
