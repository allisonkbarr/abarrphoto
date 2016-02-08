import {element} from 'deku'
import {overlayOpen, overlayClose} from '../action_creators'

export default {
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

    return <div id="overlay-component">
      <div id="overlay-container">
        <i class="material-icons" id="left-arrow" onClick={showPrevImg}>chevron_left</i>
        <div id="overlay-image-div" style={ 'background-image: url(' + currentImages[i] + ')'}></div>
        <i class="material-icons" id="right-arrow" onClick={showNextImg}>chevron_right</i>
      </div>
      <i class="material-icons" id="close-button" onClick={() => dispatch(overlayClose())} >close</i>
    </div>
  }
}
