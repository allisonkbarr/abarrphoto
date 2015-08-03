
import React from 'react'
import Project from 'components/project.jsx!'

export default React.createClass({

  render: function() {

    return <div className="page" id="projects-component">
      <div id="project-list">
      {
        this.props.projects.list.map(function(p) {
          return <div className="project-item">
            { p.name }
          </div>
        })
      }
      </div>
    </div>
  }
})



