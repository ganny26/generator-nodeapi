let sayping = (req,res)=>{
    if (!req.body) {
        res.status(404).json({ 'status': false });
    } else {
        res.status(200).json({ 'status': true });
    }
}

module.exports = {
    'sayping':sayping
}