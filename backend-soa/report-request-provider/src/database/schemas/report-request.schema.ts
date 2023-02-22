import * as mongoose from 'mongoose';

export const ReportResultSchema = new mongoose.Schema({
    emotion: String,
    count: Number
});

export const ReportRequestSchema = new mongoose.Schema({
    id: Number,
    email: String,
    date: String,
    type: Number,
    pathFile: String,
    link: String,
    spectrograms: [String],
    results: [ReportResultSchema],
    status: Number
});