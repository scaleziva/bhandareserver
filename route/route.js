const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../models/userSchema");
const Contact = require("../models/contactForms");

//importing auth middleware
const auth = require("../middleware/auth");

router.post('/', function (req, res) {
    console.log("hoho")
});

//registration of user
router.post("/register", async (req, res) => {
    const { email, name, phone, password, cpassword, birthday } = req.body;

    try {
        if (!email || !name || !phone || !password || !cpassword || !birthday) {
            res.status(404).json({ error: "Enter all the details" });
        } else {
            if (password !== cpassword) {
                res.status(404).json({ error: "Passwords doesnt match" });
            } else {
                const isUser = await User.findOne({ email });
                if (!isUser) {
                    const user = new User({ email, name, phone, password, cpassword, birthday });
                    await user.save();
                    res.status(200).json({ Msg: "ok ra" });
                } else {
                    res.status(404).json({ error: "email already registered" });
                }
            }
        }
    } catch (error) {
        console.log(error)
    }

});

//user login 
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(404).json({ error: "Enter all the details" });
        } else {
            const isUser = await User.findOne({ email });

            if (!isUser) {
                res.status(404).json({ error: "Invalid credentials" });
            } else {

                if (isUser.password === password) {
                    const token = await isUser.generateAuthToken();

                    res.cookie("jwtoken", token, {
                        expires: new Date(Date.now() + 69696969),
                        httpOnly: true
                    });
                    // i'll need to install cookieParser!
                    console.log("Login Successful");
                    res.status(200).json({ message: token });

                } else {
                    res.status(404).json({ error: "Invalid credentials" });
                }
            }
        }
    } catch (err) {
        console.log(err)
    }

});

//User posting contact from

router.post("/contacthome", async (req, res) => {

    try {
        const { name, email, phone, message } = req.body;

        if (!email || !name || !phone || !message) {
            res.status(404).json({ error: "Enter all the details" });
        } else {
            const contact = new Contact({ name, email, phone, message, type: "homecontact" });
            await contact.save();
            res.status(200).json({ Msg: "ok ra" });
        }

    } catch (error) {
        console.log(error);
    }

})

router.post("/contactServiceSalaried", async (req, res) => {

    try {
        const { name, email, phone, company, monthlyIncome, experience, location, getPaid } = req.body;

        if (!name || !email || !phone || !company || !monthlyIncome || !experience || !location || !getPaid) {
            res.status(404).json({ error: "Enter all the details" });
        } else {
            const contact = new Contact({ name, email, phone, company, monthlyIncome, experience, location, getPaid, type: "servicesSalaries" });
            await contact.save();
            res.status(200).json({ Msg: "ok ra" });
        }

    } catch (error) {
        console.log(error);
    }

})

router.post("/contactServiceSelfEmployee", async (req, res) => {

    try {
        const { name, email, phone, company, turnover, location, existency, industry } = req.body;

        if (!name || !email || !phone || !company || !turnover || !location || !existency || !industry) {
            res.status(404).json({ error: "Enter all the details" });
        } else {
            const contact = new Contact({ name, email, phone, company, turnover, location, existency, industry, type: "servicesSelf" });
            await contact.save();
            res.status(200).json({ Msg: "ok ra" });
        }

    } catch (error) {
        console.log(error);
    }

});

//getting data of all users
router.post("/usersasqwzxerdfcv/allusers", async (req, res) => {

    try {
        const { tokenn } = req.body;
        const rootUser = await User.findOne({ "tokens.token": tokenn });

        if (!rootUser) {
            res.status(401).send("User not found");
        } else {

            const email = rootUser.email;
            const isUser = await User.find();

            if (email === "admin@bhandarefinserve.com") {
                res.status(200).send(isUser)
            } else {
                res.status(404).json({ error: "sus" });
            }
        }
    } catch (error) {
        console.log(error);
    }

});

//getting data of home contacts
router.post("/usersasqwzxerdfcv/homecontact", async (req, res) => {

    try {
        const { tokenn } = req.body;
        const rootUser = await User.findOne({ "tokens.token": tokenn });

        if (!rootUser) {
            res.status(401).send("User not found");
        } else {
            const email = rootUser.email;

            if (email === "admin@bhandarefinserve.com") {
                const contact = await Contact.find();
                const specificDate = contact.filter((currArr) => {
                    return currArr.type === "homecontact"
                })
                res.status(200).send(specificDate)
            } else {
                res.status(404).json({ error: "sus" });
            }
        }
    } catch (error) {
        console.log(error);
    }

});

//getting data of service salaried
router.post("/usersasqwzxerdfcv/servicesSalaries", async (req, res) => {

    try {
        const { tokenn } = req.body;
        const rootUser = await User.findOne({ "tokens.token": tokenn });

        if (!rootUser) {
            res.status(401).send("User not found");
        } else {
            const email = rootUser.email;

            if (email === "admin@bhandarefinserve.com") {
                const contact = await Contact.find();
                const specificDate = contact.filter((currArr) => {
                    return currArr.type === "servicesSalaries"
                })
                res.status(200).send(specificDate)
            } else {
                res.status(404).json({ error: "sus" });
            }
        }
    } catch (error) {
        console.log(error);
    }

});

//getting data of service self
router.post("/usersasqwzxerdfcv/servicesSelf", async (req, res) => {

    try {
        const { tokenn } = req.body;
        const rootUser = await User.findOne({ "tokens.token": tokenn });

        if (!rootUser) {
            res.status(401).send("User not found");
        } else {
            const email = rootUser.email;

            if (email === "admin@bhandarefinserve.com") {
                const contact = await Contact.find();
                const specificDate = contact.filter((currArr) => {
                    return currArr.type === "servicesSelf"
                })
                res.status(200).send(specificDate)
            } else {
                res.status(404).json({ error: "sus" });
            }
        }
    } catch (error) {
        console.log(error);
    }

});

//getting data of service self
// router.get("/usersasqwzxerdfcv/servicesSalaries", auth, async (req, res) => {

//     try {
//         const email = req.email;

//         const contact = await Contact.find();

//         if (email === "admin@bhandarefinserve.com") {
//             const specificDate = contact.filter((currArr) => {
//                 return currArr.type === "servicesSalaries"
//             })
//             res.status(200).send(specificDate)
//         } else {
//             res.status(404).json({ error: "sus" });
//         }

//     } catch (error) {
//         console.log(error);
//     }

// });

//getting data of service self
// router.get("/usersasqwzxerdfcv/servicesSelf", auth, async (req, res) => {

//     try {
//         const email = req.email;

//         const contact = await Contact.find();

//         if (email === "admin@bhandarefinserve.com") {
//             const specificDate = contact.filter((currArr) => {
//                 return currArr.type === "servicesSelf"
//             })
//             res.status(200).send(specificDate)
//         } else {
//             res.status(404).json({ error: "sus" });
//         }

//     } catch (error) {
//         console.log(error);
//     }

// });

// passing notification
router.post("/usersasqwzxerdfcv/post/notification", async (req, res) => {

    const { email, notify, date, tokenn } = req.body;
    const rootUser = await User.findOne({ "tokens.token": tokenn });

    try {
        if (!rootUser) {
            res.status(401).send("User not found");
        } else {
            const eemail = rootUser.email;

            if (eemail === "admin@bhandarefinserve.com") {

                const isUser = await User.findOne({ email });

                if (!isUser) {
                    res.status(404).json({ error: "User not found" });
                } else {
                    const noti = await isUser.addNotification(notify, date);

                    // i'll need to install cookieParser!
                    console.log("Notified");
                    res.status(200).json({ message: "Notification Passed!" });
                }

            } else {
                res.status(404).json({ error: "User sus" });
            }
        }
    } catch (err) {
        console.log(err)
    }

});

// getting noti
router.post("/getnoti", async (req, res) => {

    try {
        const { tokenn } = req.body;
        const rootUser = await User.findOne({ "tokens.token": tokenn });

        if (!rootUser) {
            res.status(401).send("User not found");
        } else {
            const email = rootUser.email;

            if (!email) {
                res.status(404).json({ error: "Enter all the details" });
            } else {
                const isUser = await User.findOne({ email });
                if (!isUser) {
                    res.status(404).json({ error: "Invalid credentials" });
                } else {
                    let data = isUser.notifications;

                    res.status(200).send(data);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }

})

//change password
router.put("/changepass", async (req, res) => {

    try {
        const { password, newPassword, tokenn } = req.body;
        const rootUser = await User.findOne({ "tokens.token": tokenn });

        if (!rootUser) {
            res.status(401).send("User not found");
        } else {
            const email = rootUser.email;

            if (!email || !password || !newPassword) {
                res.status(400).json({ error: "Enter all the details" });
            } else {
                const isUser = await User.findOne({ email });

                if (!isUser) {
                    res.status(400).json({ error: "user not registered" });
                } else {
                    if (isUser.password === password) {
                        const passUpdate = await User.updateOne({ email: email }, { $set: { password: newPassword, cpassword: newPassword } })
                        res.status(200).json({ Msg: "pword changed" });
                    } else {
                        res.status(404).json({ error: "invalid credentials" });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }

});

//editprofile
router.put("/editprofile", auth, async (req, res) => {

    try {
        const { name, phone, capital, initialcapital } = req.body;
        const eemail = req.email;

        if (!eemail) {
            res.status(404).json({ msg: "user not logged in" })
        } else {
            if (!name || !phone || !capital || !initialcapital) {
                res.status(400).json({ error: "Enter all the details" });
            } else {
                const isUser = await User.findOne({ email: eemail });
                if (!isUser) {
                    res.status(420).json({ error: "user not registered" });
                } else {
                    const passUpdate = await User.updateOne({ email: eemail }, { $set: { name: name, phone: phone, capital: capital, initialcapital: initialcapital } })
                    res.status(200).json({ Msg: "account changed" });
                }
            }
        }

    } catch (error) {
        console.log(error)
    }

});

// delete account
router.delete("/deleteaccount", async (req, res) => {

    const { password, tokenn } = req.body;

    const rootUser = await User.findOne({ "tokens.token": tokenn });

    if (!rootUser) {
        res.status(401).send("User not found");
    } else {
        const email = rootUser.email;

        if (!email || !password) {
            res.status(400).json({ error: "enter all the details" });
        } else {
            const isUser = await User.findOne({ email });
            if (!isUser) {
                res.status(400).json({ error: "email not found" });
            } else {
                if (isUser.password !== password) {
                    res.status(400).json({ error: "invalid credentials" });
                } else {
                    const deleteUseer = await User.deleteOne({ email: email })
                    res.status(200).json({ msg: "account deleted" });
                }
            }
        }
    }

});

//isuser authenticate?
router.post("/isuserauthenticate", auth, async (req, res) => {

    res.status(200).json({ msg: req.email })
});

//isuser authenticate? for profile
router.post("/isuserauthenticateprofile", async (req, res) => {

    const { tokenn } = req.body;

    try {
        const rootUser = await User.findOne({ "tokens.token": tokenn });

        if (!rootUser) {
            res.status(401).send("User not found");
        } else {
            res.status(200).json({ rootUser });
        }

    } catch (error) {
        res.status(401).send("Unauthorized: No tokens found");
        // console.log(error);
    }

});

// logout
router.get("/logout", (req, res) => {
    // console.log("log out");
    res.clearCookie("jwtoken", { path: "/" })
    res.status(200).json({ msg: "Log out success" });
});

router.get("*", (req, res) => {
    res.send("<h1>Heyy there! Finally</h1>")
});

module.exports = router;