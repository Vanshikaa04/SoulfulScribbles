import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';

// Helper: extract public_id safely
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split('/');
    const file = parts.slice(-2).join('/');
    return file.split('.')[0];
  } catch {
    return null;
  }
};

// Helper: detect if video
const isVideo = (url) => {
  return /\.(mp4|mov|avi|webm|mkv)$/i.test(url);
};

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

// @desc  Get single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Create project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      org,
      image,     // old support
      media,     // new support
      link,
      tech,
      featured,
      order
    } = req.body;

    let finalMedia = [];

    // If new media array is provided
    if (media && Array.isArray(media)) {
      finalMedia = media;
    }

    // Backward support (single image field)
    if (image) {
      finalMedia.push({
        url: image,
        public_id: getPublicIdFromUrl(image),
        type: isVideo(image) ? 'video' : 'image'
      });
    }

    const project = new Project({
      title,
      description,
      category,
      org,
      media: finalMedia,
      link,
      tech: tech || [],
      featured: featured || false,
      order: order || 0
    });

    await project.save();
    res.status(201).json(project);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const fields = [
      'title',
      'description',
      'category',
      'org',
      'media',
      'link',
      'tech',
      'featured',
      'order'
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        project[f] = req.body[f];
      }
    });

    // Backward support (image field)
    if (req.body.image) {
      project.media.push({
        url: req.body.image,
        public_id: getPublicIdFromUrl(req.body.image),
        type: isVideo(req.body.image) ? 'video' : 'image'
      });
    }

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Delete all media from Cloudinary
    for (const item of project.media || []) {
      try {
        const public_id = item.public_id || getPublicIdFromUrl(item.url);

        await cloudinary.uploader.destroy(public_id, {
          resource_type: item.type === 'video' ? 'video' : 'image'
        });

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

// @desc  Add media (image/video)
export const addProjectMedia = async (req, res) => {
  try {
    const { media } = req.body;

    if (!media || !Array.isArray(media)) {
      return res.status(400).json({ message: 'media array required' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const formatted = media.map(item => ({
      url: item.url,
      public_id: item.public_id || getPublicIdFromUrl(item.url),
      type: item.type || (isVideo(item.url) ? 'video' : 'image')
    }));

    project.media.push(...formatted);

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Remove single media (KEEPING YOUR FEATURE)
export const removeProjectMedia = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Media URL is required' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const mediaItem = project.media.find(m => m.url === url);

    if (!mediaItem) {
      return res.status(400).json({ message: 'Media not found' });
    }

    const public_id = mediaItem.public_id || getPublicIdFromUrl(url);

    try {
      await cloudinary.uploader.destroy(public_id, {
        resource_type: mediaItem.type === 'video' ? 'video' : 'image'
      });
    } catch (err) {
      console.error('Cloudinary delete failed:', err.message);
    }

    project.media = project.media.filter(m => m.url !== url);

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Toggle featured
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