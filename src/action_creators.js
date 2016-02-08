const pageSelect = page => ({ type: 'SELECT_PAGE', page })

const sidebarToggle = () => ({ type: 'TOGGLE_SIDEBAR' })

const projectSelect = project => ({ type: 'SELECT_PROJECT', project })

const overlayClose = () => ({ type: 'CLOSE_OVERLAY' })

const overlayOpen = image => ({ type: 'OPEN_OVERLAY', image })

export {
  pageSelect,
  sidebarToggle,
  projectSelect,
  overlayClose,
  overlayOpen
}
