
// these are scoped to read-only and safe for public consumption
AWS.config.update({accessKeyId: 'AKIAJVDGHJQGAIUUUQSQ', secretAccessKey: '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'})
AWS.config.region = 'us-east-1'

var s3 = new AWS.S3({apiVersion: '2006-03-01'})

export default {

  all: new Promise(function(res, rej) {
    s3.listObjects({ Bucket: 'www.abarrphoto.com' }, function(e, objects) {
      res(objects)
    })
  })
}
