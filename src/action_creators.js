const pageSelect = page => ({ type: 'SELECT_PAGE', page })

const sidebarToggle = () => ({ type: 'TOGGLE_SIDEBAR' })

const projectSelect = project => ({ type: 'SELECT_PROJECT', project })

const overlayClose = () => ({ type: 'CLOSE_OVERLAY' })

const overlayOpen = image => ({ type: 'OPEN_OVERLAY', image })

const imgLoaded = image => ({ type: 'IMAGE_LOADED', image })

const overlayImgLoaded = image => ({ type: 'OVERLAY_IMAGE_LOADED', image })

export {
  pageSelect,
  sidebarToggle,
  projectSelect,
  overlayClose,
  overlayOpen,
  imgLoaded,
  overlayImgLoaded
}
