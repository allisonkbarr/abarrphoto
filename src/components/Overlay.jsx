import {element} from 'deku'
import {overlayOpen, overlayClose} from '../action_creators'
import {overlayImgUrl} from '../helpers'

export default {

  onCreate () {
    return document.body.classList.add('overlay-open')
  },

  onRemove () {
    return document.body.classList.remove('overlay-open')
  },

  render({ context, dispatch }) {

    const i = context.view.currentImage
    const currentImages = context.view.page === 'gallery' ?
      context.galleryImages :
      context.projects[context.view.currentProject].photos

    const showNextImg = () => {
      return currentImages[i+1] ?
        dispatch(overlayOpen(i+1)) :
        dispatch(overlayOpen(0))
    }

    const showPrevImg = () => {
      return currentImages[i-1] ?
        dispatch(overlayOpen(i-1)) :
        dispatch(overlayOpen(currentImages.length-1))
    }

    return <div>
      <div id="overlay-container">
        <i class="material-icons" id="left-arrow" onClick={showPrevImg}>chevron_left</i>
        <div id="overlay-image-div" style={ 'background-image: url(' + overlayImgUrl(context.view.windowWidth, context.view.windowHeight, currentImages[i]) + ')'}></div>
        <i class="material-icons" id="right-arrow" onClick={showNextImg}>chevron_right</i>
      </div>
      <i class="material-icons" id="close-button" onClick={() => dispatch(overlayClose())} >close</i>
    </div>
  }
}
