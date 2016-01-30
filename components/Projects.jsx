import {element} from 'deku'
import marked from 'marked'
import {createPhotoA} from '../helpers'


export default {
  render({ context, dispatch }) {

    const current = context.projects[context.view.currentProject]

    return <div class="page-component project-component" id="projects-component">
      <h2 class="page-title">{ current.title }</h2>
      <div id="project-blurb" innerHTML={ marked(current.blurb) }></div>
      <div class="thumbs">
        { current.photos.map(createPhotoA.bind(null, dispatch)) }
      </div>
    </div>
  }
}
