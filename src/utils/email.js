import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "omarfetooh62@gmail.com",
        pass: "ltunilmwsdursbee",
    }
})