
import React from 'react'
import image from 'lib/image'

export default React.createClass({

  render: function() {
    var photo = this.props.project.photos[this.props.index]
    return <div id="gallery">
      <a 
        href={ this.props.project.name === 'gallery' ? '/#/gallery' : '/#/projects/' + this.props.project.slug} 
        className="close"
      ><i className="fa fa-close"></i></a>
      <div className="big" style={{
        backgroundImage: 'url(' + image(photo.src, this.props.hub.get().screen) + ')',
      }}></div>
    </div>
  }
})
