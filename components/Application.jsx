import {element} from 'deku'
import cx from 'classnames'
import marked from 'marked'

const pageSelect = page => ({ type: 'SELECT_PAGE', page })
const sidebarToggle = () => ({ type: 'TOGGLE_SIDEBAR' })
const projectSelect = project => ({ type: 'SELECT_PROJECT', project })
const overlayClose = () => ({ type: 'CLOSE_OVERLAY' })
const overlayOpen = image => ({ type: 'OPEN_OVERLAY', image })

const prevDef = fn => e => {
  e.preventDefault()
  fn()
}

const createPhotoA = (dispatch, url, i) => <a href="#" style={`background-image: url(${url})`} onClick={prevDef(() => dispatch(overlayOpen(i)))} ></a>

export default {
  render({ context, dispatch }) {
    return (
      <div>
        <SideBar />
        <Content />
        { context.view.overlayOpen ? <Overlay /> : null }
      </div>
    );
  }
}

const SideBar = {
  render({ context, dispatch }) {

    const getActiveClass = (subject, type) => cx({ active: context.view[type] === subject })
    const createNavLi = (name) => <li class={getActiveClass(name, 'page') + ' nav-item'} onClick={() => dispatch(pageSelect(name))}>{name}</li>
    const createProjectLi = (name) => <li class={getActiveClass(name, 'currentProject')} onClick={() => dispatch(projectSelect(name))}>{context.projects[name].title}</li>

    return <div id="sidebar-component" class={ context.view.sidebarHidden ? 'hidden' : '' }>

      <h1 id="nav-title">Andrew Barr Photography</h1>

      <a id="nav-toggle" href="#" onClick={() => dispatch(sidebarToggle())}><i class="material-icons">menu</i></a>

      <ul id="nav">
        { ['gallery', 'about'].map(createNavLi) }
        <li id="projects-link" class={getActiveClass('projects', 'page') + ' nav-item'} >
          Projects
          <i class="material-icons">chevron_right</i>
          <ul id="projects-nav" class={ context.view.projectsNavHidden ? 'hidden' : '' }>
            { Object.keys(context.projects).map(createProjectLi) }
          </ul>
        </li>
      </ul>

      <a id="contact" href="mailto:abarrphoto@gmail.com">abarrphoto@gmail.com</a>

  </div>
  }
}

const Content = {
  render({ context }) {
    return <div id="content-component">
      <div id="title-container">
        <h1 id="title">Andrew Barr Photography</h1>
      </div>
      { context.view.page === 'about' ? <About /> : null}
      { context.view.page === 'gallery' ? <Gallery /> : null}
      { context.view.page === 'projects' ? <Projects /> : null}
    </div>
  }
}

const Gallery = {
  render({ context, dispatch }) {

    return <div class="page-component" id="gallery-component">
      <h2 class="page-title">Gallery</h2>
      <div class="thumbs">
        { context.galleryImages.map(createPhotoA.bind(null, dispatch)) }
      </div>
    </div>
  }
}


const Projects = {
  render({ context, dispatch }) {

    const current = context.projects[context.view.currentProject]

    return <div class="page-component project-component" id="projects-component">
      <h2 class="page-title">{ current.title }</h2>
      <div id="project-blurb" innerHTML={ marked(current.blurb) }></div>
      <div class="thumbs">
        { current.photos.map(createPhotoA.bind(null, dispatch)) }
      </div>
    </div>
  }
}

const About = {
  render({ context }) {
    return <div class="page-component" id="about-component">
      <h2 class="page-title">About</h2>
      <div id="about-p" innerHTML={ marked(context.about) }></div>
    </div>
  }
}

const Overlay = {
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
