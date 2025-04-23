import { LayoutProps } from "sanity";
import { } from "@sanity/ui"

// ComponentType<LayoutProps>

const Layout = (props: LayoutProps) => {
  return (
    <div className="bg-red-300 min-h-screen h-full">
      {props.renderDefault(props)}
    </div>
  )
}

export default Layout
