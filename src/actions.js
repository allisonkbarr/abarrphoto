
import R from 'ramda'
import axios from 'axios'

const justKeys = R.map(R.prop('Key'))
const toObject = R.reduce((obj, key) => R.assocPath(key.split('/'), {}, obj), {})
const parseObjects = R.pipe(justKeys, toObject)
const keys = R.pipe(R.keys, R.filter(R.identity))

AWS.config.update({
  accessKeyId: 'AKIAJIXBME7POBLPG5NQ',
  secretAccessKey: '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'
})

const aws = new AWS.S3();

const dataPromise = new Promise((res, rej) => {
  aws.listObjects({ Bucket: 'www.abarrphoto.com', Prefix: 'photos' }, (e, data) => {
    if (e) return rej(e)
    const obj = parseObjects(data.Contents)
    res(obj)
  })
})

const fetch = (url) => {
  return axios.get(url).then(resp => resp.data)
}

const parseProject = async (projects, name) => {
  const project = projects[name]
  const imageUrls = keys(project).filter(key => key !== 'project.txt').map((str)=>`https://s3.amazonaws.com/www.abarrphoto.com/photos/projects/${name}/${str}`)
  const text = await fetch(`https://s3.amazonaws.com/www.abarrphoto.com/photos/projects/${name}/project.txt`)
  const afterName = text.split('[title]')[1]
  const parts = afterName.split('[description]')
  const [ title, blurb ] = parts
  return {
    photos: imageUrls,
    title,
    blurb
  }
}

export const loadData = async () => {

  const data = await dataPromise

  const { gallery, projects } = data.photos

  const galleryImages = keys(gallery).map(x => `https://s3.amazonaws.com/www.abarrphoto.com/photos/gallery/${x}`)
  const projectDataPromises = keys(projects).map(parseProject.bind(null, projects))

  const projectData = await Promise.all(projectDataPromises)

  return {
    galleryImages,
    projects: projectData.reduce((obj, p) => Object.assign(obj, { [p.title]: p }), {})
  }
}
