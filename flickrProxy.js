const Flickr = require('flickr-sdk');

flickr = new Flickr(process.env.FLICKR_API_KEY);

module.exports = group_id => (req, res) => {
  flickr.groups.pools.getPhotos({ group_id, format: 'JSON' }).then(_res => {
    res.send(_res.body);
  });
}
