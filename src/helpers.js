import {element} from 'deku'
import {overlayOpen} from './action_creators'


const prevDef = fn => e => {
  e.preventDefault()
  fn()
}

const loadingImages = []
const createPhotoLink = (dispatch, loadedImages, url, i) => {

  const isLoaded = loadedImages.indexOf(url) > -1

  if (!isLoaded) {
    const isLoading = loadingImages.indexOf(url) > -1
    if (!isLoading) {
      loadingImages.push(url)
      preload(url, () => dispatch({ type: 'IMAGE_LOADED', payload: url }))
    }
    return <a href="#" onClick={prevDef}><i class="material-icons">cached</i></a>
  }

  return <a href="#" style={`background-image: url(${url})`} onClick={prevDef(() => dispatch(overlayOpen(i)))} ></a>
}


const imgUrl = (originalSrc, width, height=null) => {
  return height ?
    'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',h_' + height + ',c_fill/' + originalSrc :
    'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',c_fill/' + originalSrc
}


const createThumb = (dispatch, windowWidth, loadedImages, url, i) => {

  const threeAcrossWidth = windowWidth < 1024 ?
    parseInt(windowWidth * 0.31) :
    parseInt((windowWidth - 230) * 0.31)

  const modifiedUrl = windowWidth < 568 ?
    imgUrl(url, parseInt(windowWidth), 200) :
    imgUrl(url, threeAcrossWidth, 250)

  return createPhotoLink(dispatch, loadedImages, modifiedUrl, i)
}

const overlayImgUrl = (windowWidth, windowHeight, originalSrc) => {
  const width = parseInt(windowWidth * 0.9)
  const height = parseInt(windowHeight)
  return 'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',h_' + height + ',c_fit/' + originalSrc
}


const preload = (imgUrl, callback) => {

  const image = document.createElement('img')
  image.style = 'position: absolute; left: -1000px; height: 1px; width: 1px;'
  document.body.appendChild(image)

  image.onload = () => {
    document.body.removeChild(image)
    callback()
  }

  image.setAttribute('src', imgUrl)
}


export {
  prevDef,
  imgUrl,
  createThumb,
  overlayImgUrl,
  preload
}
