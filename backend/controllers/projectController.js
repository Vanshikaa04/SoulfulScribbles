import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';

// @desc  Get all projects  (public)
// @route GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Get single project  (public)
// @route GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Create project  (admin)
// @route POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { title, description, category, org, image, link, tech, featured, order } = req.body;
    const project = new Project({ title, description, category, org, image, link, tech: tech || [], featured: featured || false, order: order || 0 });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Update project  (admin)
// @route PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const fields = ['title', 'description', 'category', 'org', 'image', 'link', 'tech', 'featured', 'order'];
    fields.forEach(f => { if (req.body[f] !== undefined) project[f] = req.body[f]; });

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Delete project  (admin)
// @route DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Delete image from Cloudinary if present
    if (project.image) {
      try {
        const publicId = project.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(`soulful-scribble/${publicId}`);
      } catch (e) {
        console.error('Cloudinary delete failed:', e.message);
      }
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Toggle featured  (admin)
// @route PATCH /api/projects/:id/featured
export const toggleProjectFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.featured = !project.featured;
    await project.save();
    res.json({ featured: project.featured });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};