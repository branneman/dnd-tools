import React from 'react'
import { render } from '@testing-library/react'
import App from './index'

test('renders without errors', () => {
  const { getByText } = render(<App />)
})
