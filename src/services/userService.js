import db from "../models/index";
import bcrypt from 'bcryptjs'
let salt = bcrypt.genSaltSync(10);


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
// let handleUserLogin = (email, password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let userData = {};

//             let isExist = await checkUserEmail(email);
//             if (isExist) {
//                 //exist that email
//                 //compare password
//                 let user = await db.User.findOne({
//                     where: { email: email },
//                     raw: true
//                 });
//                 if (user) {
//                     let check = bcrypt.compareSync(password, user.password);
//                     console.log('check password:', check);
//                     if (check) {
//                         userData.errCode = 0;
//                         userData.errMessage = 'Check ngon r';

//                         delete user.password;
//                         userData.user = user;
//                     } else {
//                         userData.errCode = 3;
//                         userData.errMessage = 'sai password';
//                     }
//                 } else {
//                     userData.errCode = 2;
//                     userData.errMessage = `User doesn't exist`;
//                 }
//                 resolve(userData)
//             } else {
//                 //return err
//                 userData.errCode = 1;
//                 userData.errMessage = `your email doesn't exist in out system.pls try again`
//                 resolve(userData)
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userr = await db.User.findOne({
                where: { email: userEmail }
            })
            if (userr) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userr = await db.User.findOne({
                where: { username: username }
            })
            if (userr) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist ?
            let check = await checkUserEmail(data.email);
            let check2 = await checkUsername(data.username);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email đã tồn tại vui lòng chọn cái khác '
                });
            }
            if (check2 === true) {
                resolve({
                    errCode: 2,
                    errMessage: 'Tên tài khoản đã tồn tại vui lòng chọn cái khác '
                });
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                   fullname : data.fullname,
                   username : data.username,
                   password: hashPasswordFromBcrypt,
                   email : data.email,
                   role : data.role,
                   description : data.description
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo thành công'
                });
            }
            await db.User.create({
                   fullname : data.fullname,
                   username : data.username,
                   password: data.password,
                   email : data.email,
                   role : data.role,
                   description : data.description
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo thành công'
                });
        } catch (e) {
            reject(e);
        }
    })
}
// let deleteUser = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: userId }
//             })
//             if (!user) {
//                 resolve({
//                     errCode: 2,
//                     errMessage: `The user doesn't exist `
//                 })
//             }
//             await db.User.destroy({
//                 where: { id: userId }
//             });
//             resolve({
//                 errCode: 0,
//                 errMessage: `Delete ngon r `
//             })
//         } catch (error) {
//             reject(error)
//         }

//     })
// }
// let updateUserData = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!data.id || !data.roleId || !data.gender) {
//                 resolve({
//                     errCode: 2,
//                     errMessage: 'missing input parameter'
//                 })
//             }
//             else {
//                 let user = await db.User.findOne({
//                     where: { id: data.id },
//                     raw: false
//                 })
//                 if (user) {
//                     user.firstName = data.firstName
//                     user.lastName = data.lastName
//                     user.address = data.address
//                     user.roleId = data.roleId
//                     user.positionId = data.positionId
//                     user.gender = data.gender
//                     user.phonenumber = data.phonenumber
//                     if (data.avatar) {
//                         user.image = data.avatar
//                     }
//                     await user.save();
//                     resolve({
//                         errCode: 0,
//                         errMessage: ' Lưu ok r'
//                     });
//                 }
//                 else {
//                     resolve({
//                         errCode: 1,
//                         errMessage: ' Không thấy người dùng',
//                     });
//                 }
//             }
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
// let getAllCodeService = (typeIp) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let res = {};
//             if (!typeIp) {
//                 res.errCode = 1,
//                     res.errMessage = 'missing input parament'
//             } else {
//                 let allCode = await db.allcodes.findAll({
//                     where: {
//                         type: typeIp
//                     }
//                 });
//                 res.errCode = 0;
//                 res.errMessage = 'lấy ra ngon r'
//                 res.data = allCode
//             }
//             resolve(res)
//         } catch (error) {
//             console.log(error)
//         }
//     })
// }
module.exports = {
    // handleUserLogin: handleUserLogin,
     checkUserEmail: checkUserEmail,
     getAllUsers: getAllUsers,
     createNewUser: createNewUser,
    // deleteUser: deleteUser,
    // updateUserData: updateUserData,
    // getAllCodeService: getAllCodeService
}