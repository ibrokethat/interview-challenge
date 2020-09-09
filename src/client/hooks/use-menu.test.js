import { renderHook, act } from '@testing-library/react-hooks';

import { useMenu } from './use-menu';

describe('hooks/useMenu', () => {
    let items;
    let result;
    let rerender;

    describe('initial render with no items', () => {

      beforeEach(() => {
        ({result} = renderHook(() => useMenu([])));
      });

      test('returns api', () => {
          const {addItemToMenu, removeItemFromMenu} = result.current;
          expect(addItemToMenu).toBeInstanceOf(Function);
          expect(removeItemFromMenu).toBeInstanceOf(Function);
      });

      test('returns menu items', () => {
        expect(result.current.menuItems).toEqual([])
      });

      test('returns items', () => {
        expect(result.current.items).toEqual([])
      });

    })

    describe('rerender with items', () => {

      beforeEach(() => {
        items = [];
        ({result, rerender} = renderHook(() => useMenu(items)));
        items = [{id: 1}, {id: 2}, {id: 3},];
        rerender()
      });

      test('returns menu items', () => {
        expect(result.current.menuItems).toEqual([])
      });

      test('returns items', () => {
        expect(result.current.items).toEqual(items)
      });

      test('#addItemToMenu adds the item to the menuItems list', () => {
          act(() => result.current.addItemToMenu(1));
          expect(result.current.menuItems).toEqual([{
            id: 1
          }])
      });

      test('#addItemToMenu removes the item from the items list', () => {
          act(() => result.current.addItemToMenu(1));
          expect(result.current.items).toEqual([{id: 2}, {id: 3}])
      });

      test('#removeItemFromMenu removes the item from the menuItems list', () => {
          act(() => result.current.addItemToMenu(2));
          expect(result.current.menuItems).toEqual([{id: 2}])
          act(() => result.current.removeItemFromMenu(2));
          expect(result.current.menuItems).toEqual([])
      });

      test('#removeItemFromMenu returns the item to the items list', () => {
          act(() => result.current.addItemToMenu(2));
          expect(result.current.items).toEqual([{id: 1}, {id: 3}])
          act(() => result.current.removeItemFromMenu(2));
          expect(result.current.items).toEqual([{id: 1}, {id: 2}, {id: 3}])
      });

    })

  });
