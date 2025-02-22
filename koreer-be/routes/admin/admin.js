const express = require('express');
const router = express.Router();
const adminUserController = require('../../controllers/admin/adminUserController');
const adminCommCodeController = require('../../controllers/admin/adminCommCodeController');
const adminComInfoController = require('../../controllers/admin/adminComInfoController');
const adminCommunityController = require('../../controllers/admin/adminCommunityController');
const adminSubscriberController = require('../../controllers/admin/adminSubscriberController');
const adminNewsLetterController = require('../../controllers/admin/adminNewsLetterController');
const adminCommonController = require('../../controllers/admin/adminCommonController');

var adminAuthMiddleware = require('../../src/middlewares/adminAuthMiddleware');

// Users
router.use(adminAuthMiddleware);
router.get('/users', adminUserController.getUsers);
router.get('/users/:id', adminUserController.getUserByCondition);
router.post('/users/:id/modify', adminUserController.updateUser);

// Codes
router.get('/codes', adminCommCodeController.getCodes);
router.get('/codes/:groupCode', adminCommCodeController.getCodeByGroupCode);
router.post('/codes', adminCommCodeController.createCode);
router.post('/codes/:id/modify', adminCommCodeController.updateCode);
router.post('/codes/:id/delete', adminCommCodeController.deleteCode);

// Company Information
router.post('/company-info', adminComInfoController.createInfo);
router.get('/company-info', adminComInfoController.getInfos);
router.get('/company-info/:id', adminComInfoController.getInfoById);
router.post('/company-info/:id/modify', adminComInfoController.updateInfo);
router.delete('/company-info/:id/delete', adminComInfoController.deleteInfo);

// Commnunities
router.get('/posts', adminCommunityController.getPosts);
router.get('/posts/:id', adminCommunityController.getPostById);
router.delete('/posts/:id/delete', adminCommunityController.deletePost);
router.delete('/comments/:id/delete', adminCommunityController.deleteComment);

// Subscribers
router.get('/subscribers', adminSubscriberController.getSubscribers);
router.get('/subscribers/:id', adminSubscriberController.getSubscriberById);
router.delete('/subscribers/:id/delete', adminSubscriberController.deleteSubscriber);

// NewLetters
router.post('/newsletter', adminNewsLetterController.createNewsLetter);
router.get('/newsletter', adminNewsLetterController.getNewsLetters);
router.get('/newsletter/:id', adminNewsLetterController.getNewsLetterById);
router.post('/newsletter/:id/modify', adminNewsLetterController.updateNewsLetter);
router.delete('/newsletter/:id/delete', adminNewsLetterController.deleteNewsLetter);

//common
router.get('/common/count', adminCommonController.getCurrentCounts);

module.exports = router;