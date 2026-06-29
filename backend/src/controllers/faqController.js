import FaqSuggestion from '../models/FaqSuggestion.js';
import KnowledgeBase from '../models/KnowledgeBase.js';

export const getFaqSuggestions = async (req, res) => {
  try {
    const suggestions = await FaqSuggestion.find().populate('ticketId', 'subject').sort('-createdAt');
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveFaqSuggestion = async (req, res) => {
  try {
    const customAnswer = req.body.suggestedAnswer;
    const suggestion = await FaqSuggestion.findByIdAndUpdate(
      req.params.id, 
      { 
        status: 'approved',
        ...(customAnswer && { suggestedAnswer: customAnswer })
      }, 
      { new: true }
    );
    if (!suggestion) return res.status(404).json({ message: 'Suggestion not found' });
    
    // Add to KB
    await KnowledgeBase.create({
      title: suggestion.suggestedQuestion,
      question: suggestion.suggestedQuestion,
      answer: customAnswer || suggestion.suggestedAnswer,
      status: 'published',
      createdBy: req.user._id
    });
    
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectFaqSuggestion = async (req, res) => {
  try {
    const suggestion = await FaqSuggestion.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!suggestion) return res.status(404).json({ message: 'Suggestion not found' });
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
