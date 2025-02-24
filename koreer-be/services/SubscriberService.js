// Add Business logics here
const SubscriberRepository = require('../repositories/SubscriberRepository');
const { AdminSubscriberDTO } = require('../dtos/admin/AdminSubscriberDTO');

class SubscriberService {
  async createSubscriber(data) {
    try {
        const sub = await SubscriberRepository.create(data);
        return new AdminSubscriberDTO(sub); // DTO로 응답 생성
    } catch (error) {
        console.error('Error in createSubscriber:', error);
        throw error;
    }
  }
  
  async subDuplCheck(email) {
    try {
      const dupl = await SubscriberRepository.findByEmail(email);
      if (dupl) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error('Error Duplicate Email');
    }
  }

  async deleteSubscriber(id) {
    const deleted = await SubscriberRepository.delete(id);
    if (!deleted) {
        throw new Error('Subscriber not found or delete failed');
    }
    return { message: 'Subscriber deleted successfully' };
  }
  
}

module.exports = new SubscriberService();