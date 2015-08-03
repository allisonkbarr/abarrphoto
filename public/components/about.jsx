
import React from 'react'
import R from 'ramda'
import Header from 'components/header.jsx!'
import image from 'lib/image'

export default React.createClass({

  render: function() {

    var url = 'http://res.cloudinary.com/dv3yibyz2/image/upload/img001_vvca41.jpg'
    var opts = R.merge(this.props.hub.get().screen, { crop: 'fill' })

    return <div 
      style={{
        backgroundImage: 'url(' + image(url, opts) + ')'
      }}
      className="page" 
      id="about-component">
      <div className="content">
        <h2>About us</h2>
        <p>
          Our photographic services cover all aspects of the built environment; Specializing in the historic 
          preservation projects, we document for national register nominations, historic structure reports and on-
          going building restoration documentation. Large format equipment and film is used to meet Historic 
          American Building Survey (HABS) standards.
        </p>
      </div>
    </div>
  }
})


