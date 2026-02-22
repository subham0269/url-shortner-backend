class UrlController {
    async create(req, res) {
        console.log('req');
        console.dir(req.body);
        return res.status(200).json({message: 'success'});
    }
}

module.exports = new UrlController();