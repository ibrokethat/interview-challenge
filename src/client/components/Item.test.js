import React from 'react'
import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('components/Item', () => {

  describe('rendering', () => {

    let container;
    let getByText;
    let item;

    beforeEach(() => {
      item = {
        id: 1,
        name: 'Item name',
        dietaries: ['a', 'b']
      };

      ({container, getByText} = render(<Item {...item} />))
    });

    test('renders the name', () => {
        expect(getByText('Item name')).toBeInTheDocument();
    });

    test('renders the dietary information', () => {
      expect(container.querySelector('p').innerHTML).toEqual(
        '<span class="dietary">a</span><span class="dietary">b</span>'
      );
    });

    test('does not render the close button', () => {
      expect(container.querySelector('button')).not.toBeInTheDocument();
    });

    test('does render the close button if passed a remove item prop', () => {
      ({container} = render(<Item {...item} removeItem={()=> {}} />))
      expect(container.querySelector('button')).toBeInTheDocument();
    });

  })

  describe('behaviour', () => {

    let container;
    let item;
    let selectItem;
    let removeItem;

    beforeEach(() => {
      item = {
        id: 1,
        name: 'Item name',
        dietaries: ['a', 'b']
      };

      selectItem = jest.fn();
      removeItem = jest.fn();
      ({container, getByRole} = render(<Item {...item} removeItem={removeItem} selectItem={selectItem} />))
    });

    test('calls the selectItem click handler', () => {
      fireEvent.click(container.querySelector('li'));
      expect(selectItem).toHaveBeenCalled();
    });

    test('calls the removeItem click handler', () => {
      fireEvent.click(container.querySelector('button'));
      expect(removeItem).toHaveBeenCalled();
    });
  })

});
