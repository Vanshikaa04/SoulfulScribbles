import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category:    {
    type: String,
    enum: ['Web Dev', 'Design', 'Digital Marketing', 'SEO', 'Video', 'Social Media', 'Data Analysis', 'Machine Learning', 'Other'],
    required: true,
  },
  org:       { type: String, default: '' },        // e.g. "Code Master Technology" or "Freelance"
  image:     { type: String, default: '' },        // Cloudinary URL
  link:      { type: String, default: '' },        // Live / GitHub link
  tech:      [String],                             // tech stack tags
  featured:  { type: Boolean, default: false },
  order:     { type: Number, default: 0 },         // manual sort order
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);