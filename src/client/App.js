import React, {
  useState, useEffect
} from 'react';

import {useDebouncedCallback} from "use-debounce";
import {useFetch} from 'use-http'

import './App.css';
import Item from './components/Item';
import Sidebar from './components/Sidebar';
import Summary from './components/Summary';

import {useMenu} from './hooks/use-menu'

const API_ENDPOINT = 'http://localhost:8080/api/items'

export default () => {
  const [searchTerm, setSearchterm] = useState('')
  const [onChange] = useDebouncedCallback(setSearchterm, 500)
  const query = searchTerm ? `?q=${searchTerm}` : ''
  const {data = {items: []}, loading, error} = useFetch(`${API_ENDPOINT}${query}`, {}, [searchTerm])
  const {addItemToMenu, items, menuItems, removeItemFromMenu} = useMenu(data.items)

  const loadingMessage = loading ? (<h1 className="message">Loading</h1>) : null;
  const errorMessage = error ? (<h1 className="message"> Error </h1>) : null;

  return (
    <div className="wrapper">
      {loadingMessage}
      {errorMessage}
      <div className="menu-summary">
        <Summary menuItems={menuItems} />
      </div>
      <div className="container menu-builder">
        <div className="row">
          <Sidebar items={items} onChange={onChange} searchTerm={searchTerm} addItemToMenu={addItemToMenu} />
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              {menuItems.map(({dietaries, id, name}) => (
                <Item
                  key={`menu-${id}`}
                  dietaries={dietaries}
                  id={id}
                  name={name}
                  removeItem={() => removeItemFromMenu(id)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
