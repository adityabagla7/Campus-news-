import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  itemType: {
    type: String,
    enum: ['post', 'comment'],
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can only like an item once
likeSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

export default Like;