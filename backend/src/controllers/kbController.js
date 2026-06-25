import KnowledgeBase from '../models/KnowledgeBase.js';

export const createKbArticle = async (req, res) => {
  try {
    const article = await KnowledgeBase.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getKbArticles = async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    const articles = await KnowledgeBase.find(filters).populate('createdBy', 'name');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicKbArticles = async (req, res) => {
  try {
    const articles = await KnowledgeBase.find({ status: 'published' });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateKbArticle = async (req, res) => {
  try {
    const article = await KnowledgeBase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteKbArticle = async (req, res) => {
  try {
    const article = await KnowledgeBase.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
