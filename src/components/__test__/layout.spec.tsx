import Layout from '@components/layout';
import { layoutMockSetup, render } from '@utils/testing';
import React from 'react';

beforeAll(() => {
  layoutMockSetup();
});

describe('Layout', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Layout />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('link to root', () => {
    const { getByRole } = render(<Layout />);
    const element = getByRole('link');

    expect(element.getAttribute('href')).toEqual('/en/');
  });

  it('render empty main', () => {
    const { getByRole } = render(<Layout />);
    const element = getByRole('main');

    expect(element.innerHTML).toEqual('');
  });

  it('rendered main equal child', () => {
    const Foo = () => <div>Foo Component</div>;
    const { getByRole } = render(
      <Layout>
        <Foo />
      </Layout>
    );
    const element = getByRole('main');
    const foo = render(<Foo />);

    expect(element.innerHTML).toContain(foo.container.innerHTML);
  });
});
