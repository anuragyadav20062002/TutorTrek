import mongoose, { Schema, model } from 'mongoose';
import { AddCourseInfoInterface } from '@src/types/courseInterface';

const FileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  url: {
    type: String
  }
});
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    index: true // Index for the "title" field
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    index: true // Index for the "category" field
  },
  level: {
    type: String,
    required: true,
    index: true // Index for the "level" field
  },
  tags: {
    type: [String],
    required: true,
    index: true // Index for the "tags" field
  },
  price: {
    type: Number,
    required: function (this: AddCourseInfoInterface) {
      return this.isPaid;
    },
    min: 0,
    index: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    index: true // Index for the "isPaid" field
  },
  about: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  syllabus: {
    type: [String],
    required: true
  },
  requirements: {
    type: [String]
  },
  thumbnail: {
    type: FileSchema,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  guidelines: {
    type: FileSchema,
    required: true
  },
  guidelinesUrl: {
    type: String,
    default: ''
  },
  coursesEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'students'
    }
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completionStatus: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
});

// Index for the compound query: "category," "level," and "isPaid" fields together
courseSchema.index({ category: 1, level: 1, isPaid: 1 });

const Course = model('Course', courseSchema, 'course');
export default Course;
