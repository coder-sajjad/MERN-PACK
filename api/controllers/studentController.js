import mongoose from "mongoose";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import createError from "./errorController.js";


/**
 * @access public
 * @route /api/student
 * @method GET
 */
export const getAllStudent = async (req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

/**
 * @access public
 * @route /api/student/:id
 * @method GET
 */
export const getSingleStudent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        // Single student validation
        if(!student){
            return next(createError(404, "Single student not found"));
        }

        if(student){
            res.status(200).json(student);
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @access public
 * @route /api/student
 * @method POST
 */
export const createStudnet = async (req, res, next) => {
    // make hash pass
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt);

    try {
        const students = await Student.create({...req.body, password : hash_pass});
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};


/**
 * @access public
 * @route /api/student/:id
 * @method PUT/PATCH
 */
export const updateStudnet = async (req, res, next) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};


/**
 * @access public
 * @route /api/student/:id
 * @method DELETE
 */
export const deleteStudnet = async (req, res, next) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id, req.body);
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};