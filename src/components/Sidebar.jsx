import {element} from 'deku'
import cx from 'classnames'
import {prevDef} from '../helpers'
import {pageSelect, sidebarToggle, projectSelect} from '../action_creators'


export default {
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

      <a id="contact" href="mailto:abarrphoto@gmail.com" onClick={prevDef(context.actions.loadGallery)}>abarrphoto@gmail.com</a>

  </div>
  }
}
