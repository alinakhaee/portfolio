import React, { useState } from 'react';

// Helper function to escape special characters for Telegram MarkdownV2
const escapeMarkdownV2 = (text) => {
  if (typeof text !== 'string') return '';
  // Characters to escape for MarkdownV2: _ * [ ] ( ) ~ ` > # + - = | { } . !
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (validateForm()) {
        const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN || '';
        const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID || '';

        if (!botToken || !chatId) {
          console.warn(
            'Telegram Bot Token or Chat ID is not configured in environment variables. Message will not be sent to Telegram.'
          );
        }
  
        const formattedName = escapeMarkdownV2(formData.name);
        const formattedEmail = escapeMarkdownV2(formData.email);
        const formattedMessage = escapeMarkdownV2(formData.message);
  
        const textPayload = `*New Contact Form Submission:*

*Name:*
${formattedName}

*Email:*
${formattedEmail}

*Message:*
${formattedMessage}`;
  
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: textPayload,
              parse_mode: 'MarkdownV2',
            }),
          });
  
          if (response.ok) {
            console.log('Message sent to Telegram successfully!');
          } else {
            const errorData = await response.json();
            console.error('Failed to send message to Telegram:', response.status, errorData.description);
          }
        } catch (error) {
          console.error('Error sending message to Telegram:', error);
        }
  
        // Show success modal and clear form regardless of Telegram status
        setShowSuccessModal(true);
        setFormData({ name: '', email: '', message: '' }); 
        setErrors({});
      } else {
        console.log('Validation failed', errors);
      }
    } catch (error) {
        console.error("Error during form submission process:", error);
        // Optionally, set an error message to display to the user here
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Leave a message!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
          </div>
          {/* <div className="mb-4">
            <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">
              Budget
            </label>
            <select
              id="budget"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            >
              <option>$100 - $500</option>
              <option>$500 - $1000</option>
              <option>$1000 - $2000</option>
              <option>$2000+</option>
            </select>
          </div> */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              What's on your mind?
            </label>
            <textarea
              id="message"
              rows="4"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs italic mt-1">{errors.message}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className={`bg-gradient-to-r from-blue-300 to-blue-800 hover:from-blue-400 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full transition-opacity duration-150 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send message'
              )}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700"
              aria-label="Close success modal"
            >
              &times;
            </button>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-5">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thanks for submitting a message. <br/> I'll respond soon {":)"}
            </p>
            <button
              onClick={handleCloseModal}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-150"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm; 