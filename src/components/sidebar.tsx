import { Input } from "./ui/input"

const Sidebar = () => {
  return (
    <aside className='floatleft fixed top-0 h-full w-40 m-4 p-4 bg-white rounded shadow'>
      <Input type="color" />
    </aside>
  )
}

export default Sidebar
