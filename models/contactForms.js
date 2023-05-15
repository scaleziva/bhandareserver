const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    message: {
        type: String
    },
    company: {
        type: String
    },
    monthlyIncome: {
        type: String
    },
    experience: {
        type: String
    },
    location: {
        type: String
    },
    getPaid: {
        type: String
    },
    turnover: {
        type: String
    },
    existency: {
        type: String
    },
    industry: {
        type: String
    },
    type: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

// contactSchema.methods.addHomeContact = async function (name, email, phone, message) {
//     try {
//         this.contactHome = this.contactHome.concat({ name: name, email: email, phone: phone, message: message });
//         await this.save();
//         return this.contactHome;
//     } catch (error) {
//         console.log(error)
//     }
// }

// contactSchema.methods.addcontactServicesSalaried = async function (name, email, phone, company, monthlyIncome, experience, location, getPaid) {
//     try {
//         this.contactServicesSalaried = this.contactServicesSalaried.concat({ name: name, email: email, phone: phone, company: company, monthlyIncome: monthlyIncome, experience: experience, location: location, getPaid: getPaid });
//         await this.save();
//         return this.contactServicesSalaried;
//     } catch (error) {
//         console.log(error)
//     }
// }

// contactSchema.methods.addcontactServicesSelfEmployee = async function (name, email, phone, company, turnover, location, existency, industry) {
//     try {
//         this.contactServicesSelfEmployee = this.contactServicesSelfEmployee.concat({ name: name, email: email, phone: phone, company: company, turnover: turnover, location: location, existency: existency, industry: industry });
//         await this.save();
//         return this.contactServicesSelfEmployee;
//     } catch (error) {
//         console.log(error)
//     }
// }

const Contact = mongoose.model("BHANDARECONTACT", contactSchema);

module.exports = Contact;