var path = require("path")
var friendsData = require("../data/friends")

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData)
    })

    app.post('/api/friends', function (req, res) {
        var difference = 40
        var matchName = ''
        var matchPhoto = ''

        friendsData.forEach(function (friends) {
            var matchedScoresArray = []
            var totalDifference = 40

            // Function to assist in the addition reduce() below
            function add(total, num) {
                return total + num
            }

            for (var i = 0; i < friends.scores.length; i++) {
                matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friends.scores[i])));
            }

            totalDifference = matchedScoresArray.reduce(add, 0)

            if (totalDifference < difference) {
                difference = totalDifference
                matchName = friends.name
                matchPhoto = friends.photo
            }
        })

        res.json({
            name: matchName,
            photo: matchPhoto
        })

        friendsData.push(req.body);
    })
}