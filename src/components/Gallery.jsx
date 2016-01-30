import {element} from 'deku'
import {createPhotoA} from '../helpers'


export default {
  render({ context, dispatch }) {

    return <div class="page-component" id="gallery-component">
      <h2 class="page-title">Gallery</h2>
      <div class="thumbs">
        { context.galleryImages.map(createPhotoA.bind(null, dispatch)) }
      </div>
    </div>
  }
}
