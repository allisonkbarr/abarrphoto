
import React from 'react'
import image from 'lib/image'

function thumbURL(url) {
  var parts = url.split('/')
  var end = parts.pop()
  return parts.join('/') + 'c_fit,h_200,w_200' + '/' + end
}

export default React.createClass({

  selectThumb: function(i, e) {
    e.preventDefault()
    this.props.hub.emit('selectThumbByIndex', i)
  },

  render: function() {
    var project = this.props.project
    return <div className="page" id="project-component">
      <div className="content">
        <h2>{ project.name }</h2>
        { project.description ? project.description.map(function(d) { return <p>{ d }</p> }) : null } 
        <div id="thumbs">
          {
            project.photos.map(function(photo, i) {
              return <a 
                href={ project.name === 'gallery' ? '/#/gallery/' + i : '/#/projects/' + project.slug + '/gallery/' + i}
                style={{
                  backgroundImage: 'url(' + image(photo.src, {width: 200, height: 200}) + ')'
                }}
                >
              </a>
            }, this)
          }
        </div>
      </div>
    </div>
  }
})




