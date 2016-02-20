import {element} from 'deku'
import {createThumb} from '../helpers'


export default {
  render({ context, dispatch }) {

    return <div class="page-component" id="gallery-component">
      <h2 class="page-title">Gallery</h2>
      <div class="thumbs">
        {
          context.galleryImages.map(createThumb.bind(null, dispatch, context.view.windowWidth, context.loadedImages))
        }
      </div>
    </div>
  }
}
