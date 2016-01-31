const view = (state, action) => {
  switch (action.type) {
    case 'SELECT_PAGE':
      return Object.assign(state, {
        page: action.page,
        sidebarHidden: true,
        currentProject: action.page === 'projects' ? state.currentProject : null
      })
    case 'TOGGLE_SIDEBAR':
      return Object.assign(state, { sidebarHidden: !state.sidebarHidden })
    case 'SELECT_PROJECT':
      return Object.assign(state, { page: 'projects', currentProject: action.project, sidebarHidden: true })
    case 'OPEN_OVERLAY':
      return Object.assign(state, { overlayOpen: true, currentImage: action.image })
    case 'CLOSE_OVERLAY':
      return Object.assign(state, { overlayOpen: false })
    default:
      return state || {
        page: 'gallery',
        sidebarHidden: true,
        currentProject: null,
        overlayOpen: false,
        currentImage: null,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }
  }
}

const galleryImages = (state, action) => {
  switch (action.type) {
    case 'SET_GALLERY_IMAGES':
      return action.payload
    default:
      return state || []
  }
}

const projects = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.payload
    default:
      return state || {}
  }
}

const about = () => {
  return "Our photographic services cover all aspects of the built environment. Specializing in historic preservation projects, we document for National Register nominations, historic structure reports, and on-going building restoration documentation. Large-format equipment and film is used to meet Historic American Building Survey (HABS) standards."
}

const reducers = {
  view,
  galleryImages,
  projects,
  about
}

export default reducers
