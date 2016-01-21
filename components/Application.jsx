import {element} from 'deku'
import cx from 'classnames'

const pageSelect = page => ({ type: 'SELECT_PAGE', page })
const sidebarToggle = () => ({ type: 'TOGGLE_SIDEBAR' })
const projectsNavToggle = () => ({ type: 'TOGGLE_PROJECTS_NAV'})
const projectSelect = project => ({ type: 'SELECT_PROJECT', project})

const createPhotoA = (url) => <a style={`background-image: url(${url})`}></a>

export default {
  render({ context, dispatch }) {
    return (
      <div>
        <SideBar />
        <Content />
      </div>
    );
  }
}

const SideBar = {
  render({ context, dispatch }) {

    const getClasses = (page) => cx({ active: context.view.page === page })
    const createNavLi = (text) => <li class={getClasses(text) + ' nav-item'} onClick={() => dispatch(pageSelect(text))}>{text}</li>

    return <div id="sidebar-component" class={ context.view.sidebarHidden ? 'hidden' : '' }>

      <h1 id="nav-title">Andrew Barr Photography</h1>

      <a id="nav-toggle" href="#" onClick={() => dispatch(sidebarToggle())}><i class="fa fa-bars"></i></a>

      <ul id="nav">
        { ['gallery', 'about'].map(createNavLi) }
        <li class={getClasses('projects') + ' nav-item'} onMouseOver={() => dispatch(projectsNavToggle())}>Projects<i class="fa fa-angle-right"></i></li>
      </ul>

      <ul id="projects-nav" class={ context.view.projectsNavHidden ? 'hidden' : '' }>
        <li onClick={() => dispatch(projectSelect('jfkHouse'))}>JFK House</li>
        <li onClick={() => dispatch(projectSelect('duckHouse'))}>Duck House</li>
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
  render({ context }) {
    return <div class="page-component" id="gallery-component">
      <h2 class="page-title">Gallery</h2>
      <div class="thumbs">
        { context.imageUrls.map(createPhotoA) }
      </div>
    </div>
  }
}


const Projects = {
  render({ context }) {
    const current = context.projects[context.view.currentProject]

    return <div class="page-component project-component" id="projects-component">
      <h2 class="page-title">{ current.title }</h2>
      <p>{ current.blurb }</p>
      <div class="thumbs">
        { current.photos.map(createPhotoA) }
      </div>
    </div>
  }
}

const About = {
  render({ context }) {
    return <div class="page-component" id="about-component">
      <h2 class="page-title">About</h2>
      <p id="about-p">{ context.about }</p>
    </div>
  }
}
