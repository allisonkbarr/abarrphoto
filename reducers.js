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
        currentImage: null
      }
  }
}

const galleryImages = () => {
  return [
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/01-West_Elevation_q65msi.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/02-South_elevation_b0wgxk.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/03-Southeast_Elevation_aihkbq.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/01-West_Elevation_q65msi.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/02-South_elevation_b0wgxk.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/03-Southeast_Elevation_aihkbq.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/01-West_Elevation_q65msi.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/02-South_elevation_b0wgxk.jpg',
  'http://res.cloudinary.com/dv3yibyz2/image/upload/c_fit,h_200/_IGP4889_v9ltv8.jpg'
  ]
}

const projects = () => {
  return {
    jfkHouse: {
      title: 'JFK House',
      blurb: 'This dwelling, which is the last vacation home used by JFK and his family in the summer of 1963, is on Squaw Island in Hyannisport, MA. It was photographed for a National Historic Register Nomination, but the new owner, a Kennedy family member, declined to go forward with it.',
      photos: [
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//jfk-house/img001.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//jfk-house/img014_zmpab5.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//jfk-house/img014_zmpab5.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//jfk-house/img014_zmpab5.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//jfk-house/img014_zmpab5.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//HABS_vertical-12_ntdm3h.jpg'
      ]
    },
    duckHouse: {
      title: 'Duck House',
      blurb: '<p>From the Fenway Civic Association website:</p><p>"On Agassiz Road, the parkway that links the East and West Fenway, sits a late 19th century building known as the Duck House.  This City-owned building, which has been boarded up and out of use since the 1980s, has the potential to serve as a community asset."</p><p>This building was photo documented with large format photography to assist a documentation class of the BAC.</p>',
      photos: [
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//HABS_horizontal-1_oajvgf.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//HABS_horizontal-3_cpliwe.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//HABS_horizontal-4_zohcsm.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//HABS_vertical-12_ntdm3h.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//HABS_vertical-12_ntdm3h.jpg',
        'http://res.cloudinary.com/dv3yibyz2/image//upload/c_fit,w_200,h_200//HABS_vertical-12_ntdm3h.jpg'
      ]
    }
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
