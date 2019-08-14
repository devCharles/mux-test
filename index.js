require('dotenv').config()

const fs = require('fs')
const Mux = require('@mux/mux-node')
const request = require('request')

async function main () {
  const  { Video } = new Mux()

  const upload = await Video.Uploads.create({
    new_asset_settings: { playback_policy: 'public' }
  })
  
  await fs.createReadStream('./mux-video-intro.mp4')
    .pipe(request.put(upload.url, (response, error) => {
      if (error) return console.error('PUT error: ')
      console.info('PUT OK')
    }))
}

main()
.then(() => {
    console.info('DONE!')
  })
  .catch(error => {
  console.info('ERROR: ', error)
  })

