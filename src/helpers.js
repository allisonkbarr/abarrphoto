import {element} from 'deku'
import {overlayOpen} from './action_creators'


const prevDef = fn => e => {
  e.preventDefault()
  fn()
}

const createPhotoA = (dispatch, url, i) => <a href="#" style={`background-image: url(${url})`} onClick={prevDef(() => dispatch(overlayOpen(i)))} ></a>


const imgUrl = (originalSrc, width, height=null) => {
  return height ?
    'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',h_' + height + ',c_fill/' + originalSrc :
    'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',c_fill/' + originalSrc
}


const thumbUrl = (dispatch, windowWidth, url, i) => {
  const threeAcrossWidth = windowWidth < 1024 ?
    parseInt(windowWidth * 0.31) :
    parseInt((windowWidth - 230) * 0.31)

  const modifiedUrl = windowWidth < 568 ?
    imgUrl(url, parseInt(windowWidth), 200) :
    imgUrl(url, threeAcrossWidth, 250)

  return createPhotoA(dispatch, modifiedUrl, i)
}

const overlayImgUrl = (windowWidth, windowHeight, originalSrc) => {
  const width = parseInt(windowWidth * 0.9)
  const height = parseInt(windowHeight)
  return 'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',h_' + height + ',c_fit/' + originalSrc
}


export {
  prevDef,
  createPhotoA,
  thumbUrl,
  overlayImgUrl
}
