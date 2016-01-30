import {element} from 'deku'
import {overlayOpen} from './action_creators'


const prevDef = fn => e => {
  e.preventDefault()
  fn()
}

const createPhotoA = (dispatch, url, i) => <a href="#" style={`background-image: url(${url})`} onClick={prevDef(() => dispatch(overlayOpen(i)))} ></a>

export {
  prevDef,
  createPhotoA
}
