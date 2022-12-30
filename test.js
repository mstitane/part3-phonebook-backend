const db = require('mongoose')
const assert = require("assert");

const url = `mongodb+srv://mstitane:mstitane@cluster0.eyyfo0t.mongodb.net/phoneBook?retryWrites=true&w=majority
`
db.connect(url)
const testSchema = new db.Schema({
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d{5,}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
});

const User = db.model('tests', testSchema);
const user1 = new User({
phone : '09-1234556'
});
const user2 = new User({
phone : '040-22334455'
});
const user3 = new User({
phone : '10-22-334455'
});
(async () => {
    try {
        await user1.validate()
        await user2.validate();
        await user3.validate();
        console.log("all valid")
    } catch (err) {
        console.log(err)
    }
})();


