import {element} from 'deku'
import SideBar from './Sidebar.jsx'
import Content from './Content.jsx'
import Overlay from './Overlay.jsx'


export default {
  render({ context, dispatch }) {
    return (
      <div>
        <SideBar />
        <Content />
        { context.view.overlayOpen ? <Overlay /> : null }
      </div>
    );
  }
}
