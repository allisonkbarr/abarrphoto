const view = (state, action) => {
  switch (action.type) {
    case 'SELECT_PAGE':
      return Object.assign(state, { page: action.page, sidebarHidden: true, projectsNavHidden: true })
    case 'TOGGLE_SIDEBAR':
      return Object.assign(state, { sidebarHidden: !state.sidebarHidden, projectsNavHidden: true })
    case 'TOGGLE_PROJECTS_NAV':
      return Object.assign(state, { projectsNavHidden: !state.projectsNavHidden })
    case 'SELECT_PROJECT':
      return Object.assign(state, { page: 'projects', currentProject: action.project, sidebarHidden: true, projectsNavHidden: true })
    default:
      return state || {
        page: 'gallery',
        sidebarHidden: true,
        projectsNavHidden: true,
        currentProject: null
      }
  }
}

const imageUrls = () => {
  return [
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/01-West_Elevation_q65msi.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/02-South_elevation_b0wgxk.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/03-Southeast_Elevation_aihkbq.jpg'
  ]
}

const projects = () => {
  return {
    jfkHouse: {
      title: 'JFK House',
      blurb: 'This dwelling, which is the last vacation home used by JFK and his family in the summer of 1963, is on Squaw Island in Hyannisport, MA. It was photographed for a National Historic Register Nomination, but the new owner, a Kennedy family member, declined to go forward with it.',
      photos: [
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//jfk-house/img001.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//jfk-house/img014_zmpab5.jpg'
      ]
    },
    duckHouse: {
      title: 'Duck House',
      blurb: 'blah',
      photos: []
    }
  }
}

const about = () => {
  return "Our photographic services cover all aspects of the built environment. Specializing in historic preservation projects, we document for National Register nominations, historic structure reports, and on-going building restoration documentation. Large-format equipment and film is used to meet Historic American Building Survey (HABS) standards."
}

const reducers = {
  view,
  imageUrls,
  projects,
  about
}

export default reducers
