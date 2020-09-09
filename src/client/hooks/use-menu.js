import {useState} from 'react'

export const useMenu = (items = []) => {
  const [menuItems, setMenuItems] = useState(items)

  const addItemToMenu = (id) => {
    setMenuItems([items.find((item) => item.id === id), ...menuItems])
  }

  const removeItemFromMenu = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  return {
    addItemToMenu,
    items: items.filter((item) => !menuItems.find((menuItem) => menuItem.id === item.id)),
    menuItems,
    removeItemFromMenu
  }
}
