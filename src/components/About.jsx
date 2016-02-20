import {element} from 'deku'
import marked from 'marked'
import {imgUrl} from '../helpers'

export default {
  render({ context }) {
    const aboutUrl = 'https://s3.amazonaws.com/www.abarrphoto.com/photos/projects/jfk-house/img001.jpg'
    return <div class="page-component" id="about-component" style={`background-image: url(${imgUrl(aboutUrl, context.view.windowWidth, context.view.windowHeight)})` }>
      <h2 class="page-title">About</h2>
      <div id="about-p" innerHTML={ marked(context.about) }></div>
    </div>
  }
}
