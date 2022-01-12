import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from './search';

const doSearch = jest.fn();

describe('<Search />', () => {
  it('should render a form', () => {
    render(<Search doSearch={doSearch} />);

    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render a input type equals search', () => {
    render(<Search doSearch={doSearch} />);

    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search')
  })

  it('should call props.doSearch() when form is submitted', () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1)
  })

  it('should call props.doSearch() with the user input', () => {
    render(<Search doSearch={doSearch} />);

    const inputTest = 'some text here';

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    userEvent.type(input, inputTest);

    fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputTest)
  })
})