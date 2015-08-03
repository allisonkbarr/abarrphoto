
import React from 'react'
import Router from 'react-router'

function notDefault(fn) {
  return (e) => {
    e.preventDefault()
    fn()
  }
}

export default React.createClass({

  toggle: function() {
    this.props.hub.set({ showHeader: { $set: !this.props.hub.get().showHeader } })
  },

  // hack to get nav away after tapped
  tempHide: function() {
    var style = this.refs.projects.getDOMNode().style
    style.display = 'none'
    setTimeout(function() { style.display = '' }, 500)
  },

  isActive: function(pane, project) {
    if (project) {
      return pane === this.props.view.pane && this.props.projects.selected.slug === project ? 'active' : ''
    } else {
      return pane === this.props.view.pane ? 'active' : ''
    }
  },

  render: function() {
    var projects = this.props.projects.list
    return <div id="header-component">
      <h1><a onClick={this.toggle} href="/#/">Andrew Barr<br />Photography</a></h1>
      <a href="#" onClick={notDefault(this.toggle)} id="header-toggle"><i className="fa fa-bars"></i></a>
      <nav>
        <a className={this.isActive('about')} onClick={this.toggle} href="/#/about">About</a>
        <a className={this.isActive('gallery')} onClick={this.toggle} href="/#/gallery">Gallery</a>
        <span id="project-link">
          Projects
          <i className="fa fa-angle-right"></i>
          <div id="project-list" ref="projects" onClick={this.tempHide}>
            {
              projects.map(function(p) {
                return <a className={this.isActive('project', p.slug)} onClick={this.toggle} href={'/#/projects/' + p.slug}>{p.name}</a>
              }, this)
            }
          </div>
        </span>
      </nav>
      <div id="contact">
        <a href="mailto:abarrphoto@gmail.com">abarrphoto@gmail.com</a>
      </div>
    </div>
  }
})

