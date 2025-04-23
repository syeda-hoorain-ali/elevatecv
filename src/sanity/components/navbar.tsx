import { NavbarProps } from "sanity";
import {} from "@sanity/ui"

// ComponentType<NavbarProps>

const Navbar = (props: NavbarProps) => {
  return (
    <div>
      {props.renderDefault(props)}
    </div>
  )
}

export default Navbar
