import { render } from '@testing-library/react'
import Todo from '../../Todos/Todo'

test('render content', () => {
  const todo = {
    text: 'Write code',
    done: false,
  }

  const onClickDelete = jest.fn()
  const onClickComplete = jest.fn()

  const component = render(
    <Todo
      todo={todo}
      onClickDelete={onClickDelete}
      onClickComplete={onClickComplete}
    />
  )

  expect(component.container).toHaveTextContent('Write code')
})
