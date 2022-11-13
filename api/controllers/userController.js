import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import createError from "./errorController.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * @access public
 * @route /api/student
 * @method GET
 */
export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * @access public
 * @route /api/student/:id
 * @method GET
 */
export const getSingleUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const users = await User.findById(id);
        // Single users validation
        if(!users){
            return next(createError(404, "Single student not found"));
        }

        if(users){
            res.status(200).json(users);
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
export const createUser = async (req, res, next) => {
    // make hash pass
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt);

    try {
        const users = await User.create({...req.body, password : hash_pass});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


/**
 * @access public
 * @route /api/student/:id
 * @method PUT/PATCH
 */
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const users = await User.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


/**
 * @access public
 * @route /api/student/:id
 * @method DELETE
 */
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const users = await User.findByIdAndDelete(id, req.body);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// User LogIn controller
/**
 * @access public
 * @route /api/user/login
 * @method POST
 */
 export const userLogin = async (req, res, next) => {
    // const {email, password} = req.body;
    try {
        // find user
        const login_user = await User.findOne({ email : req.body.email });

        // check user exists ir not
        if(!login_user){
            return next(createError(404, "User not found!"));
        }

        // password check
        const password_check = await bcrypt.compare(req.body.password, login_user.password);

        // password handle
        if(!password_check){
            return next(createError(404, "Wrong password!"));
        }

        // create token
        const token = jwt.sign({ id: login_user._id, isAdmin : login_user.isAdmin }, process.env.JWT_SECRET);
        
        // login user info
        let { password, isAdmin, ...login_info } = login_user._doc;
        res.cookie("access_token", token).status(200).json({
            token : token,
            user : login_info
        });

    } catch (error) {
        next(error)
    }
};

/**
 * @access public
 * @route /api/user/register
 * @method POST
 */
 export const userRegister = async (req, res, next) => {
    // make hash pass
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt);

    try {
        const users = await User.create({...req.body, password : hash_pass});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};