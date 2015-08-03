
import React from 'react'
import Header from 'components/header.jsx!'
import Home from 'components/home.jsx!'
import About from 'components/about.jsx!'
import Project from 'components/project.jsx!'
import Gallery from 'components/gallery.jsx!'

var allPhotos = function(projects) {
	var list = projects.list
	var justGallery = projects.justGallery
  return list.reduce(function(photos, project) {
    return photos.concat(project.photos)
  }, justGallery)
}

export default React.createClass({

  makeGalleryProject: function() {
    return { name: 'gallery', slug: 'gallery', photos: allPhotos(this.props.projects) }
  },

  renderPage: function() {
    switch (this.props._view.pane) {
      case 'about':
        return <About 
          hub={this.props.hub}
        />
      case 'project':
        return <Project 
          hub={this.props.hub} 
          project={this.props.projects.selected} 
        />
      case 'gallery':
        return <Project 
          hub={this.props.hub} 
          project={this.makeGalleryProject()} 
        />

      default:
        return <Home hub={this.props.hub} />
    }
  },

  render: function() {

    var isGallery = this.props._view.pane === 'gallery'

    return <div id="root-component" className={this.props.hub.get().showHeader ? 'header-open' : ''}>
    
      <Header 
        view={this.props._view}
        projects={this.props.projects}
        hub={this.props.hub}
        showProjectNav={this.props.projects.showNav} />

      { this.renderPage() }

      { this.props.projects.selectedThumbIndex || this.props.hub.get().galleryThumbIndex ?
        <Gallery 
          hub={this.props.hub}
          project={isGallery ? this.makeGalleryProject() : this.props.projects.selected} 
          index={isGallery ? this.props.hub.get().galleryThumbIndex : this.props.projects.selectedThumbIndex}
          /> : null }
    </div>
  }
})

