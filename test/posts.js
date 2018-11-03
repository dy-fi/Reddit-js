const Post = require('../models/post')

describe('Posts', () => {
  it('should create with valid attributes at POST /posts', (done) => {
    chai.reqest('localhost:3000')
        .post('posts/new')
        .end((err, res) => {
            if(err) {
                done(err)
            }
            res.status.should.be.equal(200)
            done()
        })
  })
})
