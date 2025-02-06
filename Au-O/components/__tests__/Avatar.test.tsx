import * as React from 'react';
import {render} from '@testing-library/react-native';
import Avatar from '@/components/ui/Avatar';

test('Avatar komponens létezik', () => {
    expect(Avatar).toBeDefined()
})

test('Avatar fallback szöveg megjelenik', () => {
    const {getByText} = render(<Avatar image={null} nickname='TESZT'/>)

    expect(getByText("TES")).toBeDefined()
})
test('Avatar fallback szöveg nélkül is megjelenik', () => {
    const {getByText} = render(<Avatar image={null} nickname={undefined}/>)

    expect(getByText("???")).toBeDefined()
})
test('Avatar kép megjelenik', () => {
    const tree = render(<Avatar image='https://via.placeholder.com/150' nickname='TESZT'/>)

    expect(tree).toMatchSnapshot()
})