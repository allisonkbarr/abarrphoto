
import React from 'react'
import image from 'lib/image'

export default React.createClass({

  hasNext() {
    return this.props.project.photos[this.getNextIndex()]
  },

  hasBack() {
    return this.props.project.photos[this.getBackIndex()]
  },

  getNextIndex() {
    return parseInt(this.props.index) + 1
  },

  getBackIndex() {
    return parseInt(this.props.index) - 1
  },

  getInitialState() {
    return { loading: true }
  },

  componentWillReceiveProps() {
    this.setState({ loading: true })
  },

  render: function() {
    var photo = this.props.project.photos[this.props.index]
    var isGallery = this.props.project.name === 'gallery'
    console.log('is loading?', this.state.loading)
    return <div id="gallery">
      <a
        href={ isGallery ? '/#/gallery' : '/#/projects/' + this.props.project.slug}
        className="close icon"
      ><i className="fa fa-close"></i></a>
      <img
        style={{ position: 'absolute', left: -9999 }}
        onLoad={() => this.setState({ loading: false })}
        src={image(photo.src, this.props.hub.get().screen)} />
      <div className={"big " + (this.state.loading ? 'loading' : '')} style={{
        backgroundImage: this.state.loading ? 'none' : 'url(' + image(photo.src, this.props.hub.get().screen) + ')',
      }}></div>
      <div className="loader"><i className="fa fa-spinner fa-pulse"></i></div>
      { this.hasBack() ? <a href={ (isGallery ? '/#/gallery/' : '/#/projects/' + this.props.project.slug + '/gallery/') + this.getBackIndex()} className="back icon"><i className="fa fa-arrow-left"></i></a> : null }
      { this.hasNext() ? <a href={ (isGallery ? '/#/gallery/' : '/#/projects/' + this.props.project.slug + '/gallery/') + this.getNextIndex()} className="next icon"><i className="fa fa-arrow-right"></i></a> : null }
    </div>
  }
})
