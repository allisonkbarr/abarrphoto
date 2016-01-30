import {element} from 'deku'
import About from './About.jsx'
import Gallery from './Gallery.jsx'
import Projects from './Projects.jsx'


export default {
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
