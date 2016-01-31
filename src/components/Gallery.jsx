import {element} from 'deku'
import {createPhotoA, thumbUrl} from '../helpers'


export default {
  render({ context, dispatch }) {

    return <div class="page-component" id="gallery-component">
      <h2 class="page-title">Gallery</h2>
      <div class="thumbs">
        {
          context.galleryImages.map(thumbUrl.bind(null, dispatch, context.view.windowWidth))
        }
      </div>
    </div>
  }
}
