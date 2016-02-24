import {element} from 'deku'
import SideBar from './Sidebar.jsx'
import Content from './Content.jsx'
import Overlay from './Overlay.jsx'
import { imgUrl, preload } from '../helpers'



export default {

  onCreate({ context }) {
    // Preload About image
    const rawAboutUrl = 'https://s3.amazonaws.com/www.abarrphoto.com/photos/projects/jfk-house/img001.jpg'
    const aboutUrl = imgUrl(rawAboutUrl, context.view.windowWidth, context.view.windowHeight)

    preload(aboutUrl)
  },

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
