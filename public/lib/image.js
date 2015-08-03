
export default function(url, screen) {
  var parts = url.split('upload')
  var end = parts.pop()
  if (screen.height && screen.width) {
    return parts.concat([ 
			'upload',
			'c_' + (screen.crop || 'fit') + ',w_' + screen.width + ',h_' + screen.height, 
			end 
		]).join('/')
  }
}
