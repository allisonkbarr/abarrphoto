import {element} from 'deku'
import marked from 'marked'

export default {
  render({ context }) {
    return <div class="page-component" id="about-component">
      <h2 class="page-title">About</h2>
      <div id="about-p" innerHTML={ marked(context.about) }></div>
    </div>
  }
}
