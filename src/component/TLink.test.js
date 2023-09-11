import renderer from 'react-test-renderer'
import TLink from './TLink'

it('hover 状态改变类名', () => {
  const component = renderer.create(<TLink page="https://three.ucalendar.cn/">three</TLink>)
  let tree = component.toJSON()
  expect(tree)
    .toMatchSnapshot()

  // 手动触发onMouseEnter
  renderer.act(() => {
    tree.props.onMouseEnter()
  })
  // 再次渲染
  tree = component.toJSON()
  expect(tree)
    .toMatchSnapshot()

  // 手动触发 onMouseLeave
  renderer.act(() => {
    tree.props.onMouseLeave()
  })
  // 再次渲染
  tree = component.toJSON()
  expect(tree)
    .toMatchSnapshot()
})
