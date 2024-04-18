import mongoose from "mongoose";
import {Gender} from "../hooks/contactHooks.ts";

export interface ContactRequest {
    number: string;
    name: string;
    email: string;
    gender: Gender;
    user: string;
}

export interface ContactResponse {
    _id: mongoose.Types.ObjectId | undefined |string ;
    number: string;
    name: string;
    email: string;
    gender: Gender;
}