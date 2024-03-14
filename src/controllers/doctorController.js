import { query } from "express"
import doctorService from "../services/doctorService"


let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let doctor = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let getAllDoctor = async (req, res) => {
    try {
        let doctor = await doctorService.getAllDoctor()
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let postInfoDoctor = async (req, res) => {
    try {
        let doctor = await doctorService.saveDetailDoctor(req.body)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let getDetailDoctor = async (req, res) => {
    try {
        let doctor = await doctorService.getDetailDoctor(req.query.id)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let doctor = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let getScheduleDoctor = async (req, res) => {
    try {
        let doctor = await doctorService.getScheduleDoctor(req.query.doctorId, req.query.date)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let getExtraInfoById = async (req, res) => {
    try {
        let doctor = await doctorService.getExtraInfoById(req.query.doctorId)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let getProfileById = async (req, res) => {
    try {
        let doctor = await doctorService.getProfileById(req.query.doctorId)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let getListPatient = async (req, res) => {
    try {
        let doctor = await doctorService.getListPatient(req.query.doctorId, req.query.date)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}
let sendRemedy = async (req, res) => {
    try {
        let doctor = await doctorService.sendRemedy(req.body)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever...'
        })
    }
}


module.exports = {
    getTopDoctorHome, getListPatient, getAllDoctor, postInfoDoctor, getDetailDoctor,
    bulkCreateSchedule, getScheduleDoctor, getExtraInfoById, getProfileById, sendRemedy
}