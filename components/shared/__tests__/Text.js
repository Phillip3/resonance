import React from 'react';
import { render } from 'react-native-testing-library';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import Text from '../Text';

describe('<Text/>', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  test('render text', async () => {
    const { toJSON } = render(<Text>🔥</Text>);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render text with a light font', async () => {
    const { toJSON } = render(<Text light>🔥</Text>);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render text with a bold font', async () => {
    const { toJSON } = render(<Text bold>🔥</Text>);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render text with style', async () => {
    const { toJSON } = render(<Text style={{ fontSize: 30 }}>🔥</Text>);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render text with extra props', async () => {
    const { toJSON } = render(
      <Text testID="text-with-some-props" disabled>
        🔥
      </Text>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
