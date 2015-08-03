
import React from 'react'
import R from 'ramda'
import image from 'lib/image'

export default React.createClass({

  render: function() {
    if (!this.props.hub.get().screen) return null

    var url = 'http://res.cloudinary.com/dv3yibyz2/image/upload/FR_house-for_web-3_kta1ic.jpg'
    var opts = R.merge(this.props.hub.get().screen, { crop: 'fill' })

    return <div 
      style={{
        backgroundImage: 'url(' + image(url, opts) + ')'
      }}
      className="page" 
      id="home-component">
    </div>
  }
})


